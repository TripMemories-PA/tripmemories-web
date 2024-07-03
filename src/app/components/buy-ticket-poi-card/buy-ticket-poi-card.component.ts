import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketModel } from '../../models/ticket.model';
import { InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'app-buy-ticket-poi-card',
    standalone: true,
    imports: [NgIf, RouterLink, NgOptimizedImage, InputIconModule],
    templateUrl: './buy-ticket-poi-card.component.html',
    styleUrl: './buy-ticket-poi-card.component.css',
})
export class BuyTicketPoiCardComponent {
    @Input() ticket?: TicketModel;
    isLoadingImage = true;

    addTicketToBasket(ticket: TicketModel): void {
        console.log('Ticket added to basket', ticket);
    }
}
