import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

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
        ProgressBarModule,
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
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    login(): void {
        this.error = null;
        if (this.isLoading) return;
        this.isLoading = true;

        this.authService.login(this.user).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                let user: User = res.user;
                user.access_token = res.access_token;

                this.authService.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/profil']);
            },
            error: (err: Error) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }
}
