import { Injectable } from '@angular/core';
import { User, UserRegister } from '../../models/user';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NO_AUTH } from '../request.interceptor';
import { environment } from '../../../environments/environment';
import { ResetPasswordModel } from '../../models/reset-password.model';
import { LoginResponse } from '../../models/response/login.response';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const URL = environment.apiUrl + '/auth/';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public user$: Observable<User | null> = this.userSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        const storedUser = sessionStorage.getItem('user') ?? localStorage.getItem('user');
        if (storedUser !== null) {
            this.userSubject.next(JSON.parse(storedUser));
            if (sessionStorage.getItem('firstConnection')) {
                this.refreshToken();
                sessionStorage.setItem('firstConnection', 'true');
            }
        }
    }

    get user(): User | null {
        return this.userSubject.value;
    }

    setUser(user: User | null, rememberMe: boolean = false) {
        this.userSubject.next(user);
        if (user) {
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.access_token as string);
            } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', user.access_token as string);
            }
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        }
    }

    login(user: User, rememberMe: boolean) {
        return this.http
            .post<LoginResponse>(
                URL + 'login',
                {
                    login: user.username ?? user.email,
                    password: user.password,
                },
                httpOptions,
            )
            .pipe(
                tap((response: LoginResponse) => {
                    if (response.token) {
                        user.access_token = response.token;
                        this.setUser(user, rememberMe);
                        if (rememberMe) {
                            localStorage.setItem('rememberMe', 'true');
                        }
                    }
                }),
            );
    }

    register(user: UserRegister) {
        return this.http.post(
            URL + 'register',
            {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
            },
            httpOptions,
        );
    }

    logout() {
        this.setUser(null);
        localStorage.removeItem('rememberMe');
        this.router.navigate(['/login']);
    }

    resetPassword(email: User) {
        return this.http.post(URL + 'forgot-password', {
            email: email.email,
        });
    }

    newPassword(user: ResetPasswordModel, token: string) {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'Application/json',
                Authorization: 'Bearer ' + token,
            }),
            context: new HttpContext().set(NO_AUTH, true),
        };
        return this.http.put(
            URL + `password`,
            {
                password: user.password,
            },
            headers,
        );
    }

    refreshToken() {
        const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
        if (!token) {
            return;
        }
        this.http
            .post<LoginResponse>(
                URL + 'refresh',
                {},
                {
                    ...httpOptions,
                    headers: new HttpHeaders({
                        Authorization: `Bearer ${token}`,
                    }),
                },
            )
            .subscribe((response: LoginResponse) => {
                if (response.token) {
                    if (localStorage.getItem('token')) {
                        localStorage.setItem('token', response.token);
                    } else {
                        sessionStorage.setItem('token', response.token);
                    }
                    const user = this.user;
                    if (user) {
                        user.access_token = response.token;
                        this.setUser(user, !!localStorage.getItem('rememberMe'));
                    }
                }
            });
    }

    scheduleRefreshToken() {
        if (localStorage.getItem('rememberMe') === 'true') {
            setInterval(
                () => {
                    this.refreshToken();
                },
                24 * 60 * 60 * 1000,
            ); // 24 heures
        }
    }
}
