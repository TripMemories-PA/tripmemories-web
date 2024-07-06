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
    loading: boolean = false;

    gotToShop() {
        this.visible = false;
    }
}
