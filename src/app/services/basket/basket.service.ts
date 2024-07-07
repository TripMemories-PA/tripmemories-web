import { Injectable } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    private readonly BASKET_KEY = 'basket';

    constructor() {}

    addTicket(ticket: TicketModel): void {
        const currentBasket = this.getBasket();
        const existingTicket = currentBasket.find((t) => t.id === ticket.id);

        if (existingTicket) {
            existingTicket.quantity += 1;
        } else {
            ticket.quantity = 1; // Set initial quantity to 1
            currentBasket.push(ticket);
        }

        sessionStorage.setItem(this.BASKET_KEY, JSON.stringify(currentBasket));
    }

    getBasket(): TicketModel[] {
        const basket = sessionStorage.getItem(this.BASKET_KEY);
        return basket ? JSON.parse(basket) : [];
    }

    updateTicket(ticket: TicketModel): void {
        const basket = this.getBasket();
        const index = basket.findIndex((t) => t.id === ticket.id);
        if (index !== -1) {
            basket[index] = ticket;
            sessionStorage.setItem(this.BASKET_KEY, JSON.stringify(basket));
        }
    }

    removeTicket(ticketId: number): void {
        let basket = this.getBasket();
        basket = basket.filter((t) => t.id !== ticketId);
        sessionStorage.setItem(this.BASKET_KEY, JSON.stringify(basket));
    }

    clearBasket(): void {
        sessionStorage.removeItem(this.BASKET_KEY);
    }
}
