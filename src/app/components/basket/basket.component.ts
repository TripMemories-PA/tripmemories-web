import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [TableModule, ToastModule, FormsModule, PaginatorModule, ButtonModule],
    providers: [MessageService],
    templateUrl: './basket.component.html',
    styleUrl: './basket.component.css',
})
export class BasketComponent {
    cartItems: CartItem[] = [
        { id: 1, name: 'Item 1', price: 10, quantity: 1 },
        { id: 2, name: 'Item 2', price: 20, quantity: 2 },
        { id: 3, name: 'Item 3', price: 30, quantity: 1 },
    ];

    constructor(private messageService: MessageService) {}

    getTotal(): number {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    updateQuantity(item: CartItem, quantity: number): void {
        item.quantity = quantity;
        this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Quantity updated',
        });
    }

    removeItem(item: CartItem): void {
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
        this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Item removed' });
    }
}
