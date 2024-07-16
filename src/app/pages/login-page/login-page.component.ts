import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent, NgOptimizedImage],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            this.router.navigate(['/profil']);
        }
    }
}
