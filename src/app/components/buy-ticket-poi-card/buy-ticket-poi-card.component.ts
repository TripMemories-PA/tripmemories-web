import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketModel } from '../../models/ticket.model';
import { InputIconModule } from 'primeng/inputicon';
import { BasketService } from '../../services/basket/basket.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-buy-ticket-poi-card',
    standalone: true,
    imports: [NgIf, RouterLink, NgOptimizedImage, InputIconModule, ToastModule, ButtonModule],
    providers: [MessageService],
    templateUrl: './buy-ticket-poi-card.component.html',
    styleUrl: './buy-ticket-poi-card.component.css',
})
export class BuyTicketPoiCardComponent {
    @Input() ticket?: TicketModel;
    @Input() canBuy = true;
    isLoadingImage = true;

    constructor(
        private basketService: BasketService,
        private messageService: MessageService,
        protected authServices: AuthService,
    ) {}

    addTicketToBasket(): void {
        if (!this.ticket) {
            return;
        }
        const addTicket: TicketModel = { ...this.ticket, quantity: 1 };
        this.basketService.addTicket(addTicket);
        this.messageService.add({
            severity: 'success',
            summary: 'Element ajouté au panier',
            detail: 'Element ajouté au panier avec succès',
        });
    }
}
