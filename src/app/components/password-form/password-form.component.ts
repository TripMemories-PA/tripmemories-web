import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilService } from '../../services/profil/profil.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-password-form',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        IconFieldModule,
        InputTextModule,
        ToastModule,
        NgIf,
        ProgressBarModule,
    ],
    providers: [MessageService],
    templateUrl: './password-form.component.html',
    styleUrl: './password-form.component.css',
})
export class PasswordFormComponent {
    user: User = {
        password: '',
    };
    confirmPassword: string = '';
    error: string | null = null;
    hide: boolean = true;
    hide1: boolean = true;
    resetPassword: boolean = false;
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private profilService: ProfilService,
        private messageService: MessageService,
    ) {}

    get valid(): boolean {
        return !!this.user.password && !!this.confirmPassword;
    }

    submit() {
        if (this.isLoading) return;
        if (this.user.password !== this.confirmPassword) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Les mots de passe ne correspondent pas',
            });
        }
        this.error = null;
        this.isLoading = true;
        this.profilService.updatePassword(this.user.password as string).subscribe({
            next: () => {
                this.isLoading = false;
                this.error = 'Changement effectué avec succès';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Changement de mot de passe effectué avec succès',
                });
                this.authService.logout();
                setTimeout(() => {
                    this.error = null;
                }, 3000);
            },
            error: (err: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors du changement de mot de passe',
                });
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }
}
