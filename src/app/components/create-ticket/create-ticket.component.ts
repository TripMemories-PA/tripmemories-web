import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { TicketModel } from '../../models/ticket.model';

@Component({
    selector: 'app-create-ticket',
    standalone: true,
    imports: [
        ButtonModule,
        ChipsModule,
        DropdownModule,
        FileUploadModule,
        InputTextModule,
        InputTextareaModule,
        MessageModule,
        NgIf,
        PaginatorModule,
        ProgressBarModule,
        RatingModule,
    ],
    templateUrl: './create-ticket.component.html',
    styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent implements OnInit {
    @Input() ticket?: TicketModel;
    loading = false;
    success = '';
    error = '';

    nbrPeopleOptions = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
    ];

    nbrStockOptions = new Array(100)
        .fill(0)
        .map((_, i) => ({ label: (i + 1).toString(), value: i + 1 }));

    ticketRequest: TicketModel = {
        createdAt: '',
        groupeSize: 0,
        id: 0,
        poi: {
            id: 0,
            description: '',
        },
        updatedAt: '',
        image: {
            id: 0,
            url: '',
        },
        nbrPeople: 0,
        poiId: 0,
        price: 0,
        quantity: 0,
        title: '',
        description: '',
    };

    createTicket() {
        console.log('Ticket created', this.ticketRequest);
    }

    ngOnInit(): void {
        if (this.ticket) {
            this.ticketRequest = this.ticket;
        }
    }
}
