import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'primeng/api';
import { TicketModel } from '../../models/ticket.model';
import { CreatePostCardComponent } from '../create-post-card/create-post-card.component';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        DialogModule,
        NgIf,
        NgOptimizedImage,
        ProgressBarModule,
        SharedModule,
        CreatePostCardComponent,
        CreateTicketComponent,
    ],
    templateUrl: './ticket-card.component.html',
    styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent {
    @Input() ticket?: TicketModel;
    visible: boolean = false;
    visibleDelete: boolean = false;
    loading: boolean = false;

    constructor(private ticketService: TicketService) {}

    deleteTicket() {
        if (!this.ticket) return;
        this.loading = true;
        this.ticketService.deleteTicket(this.ticket.id.toString()).subscribe({
            next: () => {
                this.loading = false;
                this.visible = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }
}
