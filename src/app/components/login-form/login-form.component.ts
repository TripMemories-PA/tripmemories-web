import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { LoginResponse } from '../../models/response/login.response';
import { UserTypes } from '../../models/enum/UserTypes';
import { ProfilService } from '../../services/profil/profil.service';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        CardModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        NgIf,
        RouterLink,
        ProgressBarModule,
        CheckboxModule,
        PasswordModule,
        NgOptimizedImage,
    ],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
    user: User = {
        username: '',
        email: '',
        password: '',
    };
    error: string | null = null;
    hide: boolean = true;
    resetPassword: boolean = false;
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private profileService: ProfilService,
    ) {}

    login(): void {
        this.error = null;
        if (this.isLoading) return;
        if (!this.user.username || !this.user.password) {
            this.error =
                "Un nom d'utilisateur et un mot de passe sont nécessaire avant de se connecter";
            return;
        }
        this.isLoading = true;

        this.authService.login(this.user).subscribe({
            next: (res: LoginResponse) => {
                this.isLoading = false;
                let user: User = {
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    password: '',
                    access_token: '',
                };
                user.access_token = res.token;
                this.authService.setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', <string>res.token);

                this.profileService.getMe().subscribe({
                    next: (user) => {
                        user.access_token = res.token;
                        localStorage.setItem('user', JSON.stringify(user));
                        if (user.userTypeId === UserTypes.ADMIN) {
                            this.router.navigate(['/backoffice/users']);
                        } else {
                            this.router.navigate(['/profil']);
                        }
                    },
                });
            },
            error: (err: Error) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }

    goTo(path: string) {
        this.router.navigate([path]);
    }
}
