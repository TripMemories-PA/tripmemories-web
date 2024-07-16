import { Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-password-page',
    standalone: true,
    imports: [ChangePasswordComponent],
    templateUrl: './new-password-page.component.html',
    styleUrl: './new-password-page.component.css',
})
export class NewPasswordPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            this.router.navigate(['/profil']);
        }
    }
}
