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
        const storedUser = localStorage.getItem('user');
        if (storedUser !== null) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    get user(): User | null {
        return this.userSubject.value;
    }

    setUser(user: User | null) {
        this.userSubject.next(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }

    login(user: User) {
        return this.http.post<LoginResponse>(
            URL + 'login',
            {
                login: user.username ?? user.email,
                password: user.password,
            },
            httpOptions,
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
        localStorage.removeItem('token');
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
}
