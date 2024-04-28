import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NO_AUTH } from '../request.interceptor';
import { environment } from '../../../environments/environment';
import { ResetPasswordModel } from '../../models/reset-password.model';

const URL = environment.apiUrl + '/auth/';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: User | null = null;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        if (localStorage.getItem('user') !== null) {
            this.user = JSON.parse(localStorage.getItem('user')!);
        }
    }

    login(user: User) {
        return this.http.post(
            URL + 'login',
            {
                login: user.username ?? user.email,
                password: user.password,
            },
            httpOptions,
        );
    }

    register(user: User) {
        return this.http.post(
            URL + 'register',
            {
                username: user.username,
                email: user.email,
                password: user.password,
                password_confirmation: user.password,
            },
            httpOptions,
        );
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
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
