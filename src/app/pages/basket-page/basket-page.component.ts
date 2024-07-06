import { Component } from '@angular/core';
import { BasketComponent } from '../../components/basket/basket.component';

@Component({
    selector: 'app-basket-page',
    standalone: true,
    imports: [BasketComponent],
    templateUrl: './basket-page.component.html',
    styleUrl: './basket-page.component.css',
})
export class BasketPageComponent {}
