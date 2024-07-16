import { Component, OnInit } from '@angular/core';
import { NewPasswordComponent } from '../../components/new-password/new-password.component';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-reset-password-page',
    standalone: true,
    imports: [NewPasswordComponent, LoginFormComponent, NgOptimizedImage],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            this.router.navigate(['/profil']);
        }
    }
}
