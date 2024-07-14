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
    rememberMe: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
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

        this.authService.login(this.user, this.rememberMe).subscribe({
            next: (_: LoginResponse) => {
                this.isLoading = false;
                this.router.navigate(['/profil']);
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
