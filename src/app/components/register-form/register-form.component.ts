import { Component } from '@angular/core';
import { UserRegister } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MessageModule } from 'primeng/message';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-register-form',
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        MessageModule,
        NgIf,
        ProgressBarModule,
        CheckboxModule,
        NgOptimizedImage,
        RouterLink,
        PasswordModule,
    ],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
    user: UserRegister = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    hide1: boolean = true;
    hide2: boolean = true;
    error: string | null = null;
    ok: string | null = null;

    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    register(): void {
        this.error = null;
        if (this.isLoading) return;
        this.isLoading = true;
        if (this.user.password !== this.user.password_confirmation) {
            this.error = 'Les mots de passe ne correspondent pas';
            this.isLoading = false;
            return;
        }

        this.authService.register(this.user).subscribe({
            next: (_: any) => {
                this.isLoading = false;
                this.ok = 'Inscription réussie !';
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
