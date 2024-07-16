import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [LoginFormComponent, RegisterFormComponent, RouterModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            this.router.navigate(['/profil']);
        }
    }
}
