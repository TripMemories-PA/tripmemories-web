import { Component, OnInit } from '@angular/core';
import { BasketComponent } from '../../components/basket/basket.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-basket-page',
    standalone: true,
    imports: [BasketComponent],
    templateUrl: './basket-page.component.html',
    styleUrl: './basket-page.component.css',
})
export class BasketPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (!this.authService.user?.access_token) {
            this.router.navigate(['/login']);
        }
    }
}
