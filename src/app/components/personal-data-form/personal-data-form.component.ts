import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule } from 'primeng/paginator';
import { User } from '../../models/user';
import { UpdateMeModel } from '../../models/updateme.model';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-personal-data-form',
    standalone: true,
    imports: [InputTextModule, ButtonModule, IconFieldModule, InputIconModule, PaginatorModule],
    templateUrl: './personal-data-form.component.html',
    styleUrl: './personal-data-form.component.css',
})
export class PersonalDataFormComponent {
    user: User = {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
    };
    ok: string | null = null;
    error: string | null = null;
    resetPassword: boolean = false;
    isLoading: boolean = false;

    constructor(
        private profilServices: ProfilService,
        private authService: AuthService,
    ) {
        if (this.authService.user) {
            this.user = {
                username: this.authService.user.username,
                email: this.authService.user.email,
                firstname: this.authService.user.firstname,
                lastname: this.authService.user.lastname,
            };
        }
    }

    get valid(): boolean {
        return (
            !!this.user.username &&
            !!this.user.email &&
            !!this.user.firstname &&
            !!this.user.lastname
        );
    }

    submit(): void {
        if (this.isLoading) return;
        this.error = null;
        this.isLoading = true;
        this.profilServices.updateMe(this.user).subscribe({
            next: (res: UpdateMeModel) => {
                this.isLoading = false;
                this.ok = 'Changement effectué avec succès';
                this.updateLocalStorage(res);
                setTimeout(() => {
                    this.ok = null;
                }, 3000);
            },
            error: (err: Error) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }

    private updateLocalStorage(user: UpdateMeModel): void {
        const userLocalStorage: User = JSON.parse(
            (localStorage.getItem('user') as string) ?? (sessionStorage.getItem('user') as string),
        );
        userLocalStorage.firstname = user.firstname;
        userLocalStorage.lastname = user.lastname;
        userLocalStorage.email = user.email;
        userLocalStorage.username = user.username;
        this.authService.user!.access_token = userLocalStorage.access_token;
        localStorage.setItem('user', JSON.stringify(userLocalStorage));
    }
}
