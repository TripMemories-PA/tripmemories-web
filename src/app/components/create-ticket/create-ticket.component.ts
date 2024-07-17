import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { TicketService } from '../../services/ticket/ticket.service';
import { CreateTicketRequest } from '../../models/request/createTicket.request';

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
    @Input() update: boolean = false;
    @Output() reload: EventEmitter<any> = new EventEmitter();
    @Output() closeDialog: EventEmitter<any> = new EventEmitter();
    loading = false;
    success = '';
    error = '';

    constructor(private ticketService: TicketService) {}

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
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 },
        { label: '14', value: 14 },
        { label: '15', value: 15 },
        { label: '16', value: 16 },
        { label: '17', value: 17 },
        { label: '18', value: 18 },
        { label: '19', value: 19 },
        { label: '20', value: 20 },
        { label: '21', value: 21 },
        { label: '22', value: 22 },
        { label: '23', value: 23 },
        { label: '24', value: 24 },
        { label: '25', value: 25 },
        { label: '26', value: 26 },
        { label: '27', value: 27 },
        { label: '28', value: 28 },
        { label: '29', value: 29 },
        { label: '30', value: 30 },
    ];

    selectedNbrPeople?: { label: string; value: number };
    selectedStockOptions?: { label: string; value: number };

    nbrStockOptions = new Array(100)
        .fill(0)
        .map((_, i) => ({ label: (i + 1).toString(), value: i + 1 }));

    ticketRequest: TicketModel = {
        createdAt: '',
        groupSize: 0,
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
        const ticket: CreateTicketRequest = {
            title: this.ticketRequest.title,
            description: this.ticketRequest.description,
            price: this.ticketRequest.price,
            groupSize: this.ticketRequest.groupSize,
            quantity: this.ticketRequest.quantity,
        };
        this.ticketService.createTicket(ticket).subscribe({
            next: (_) => {
                this.success = 'Ticket créé avec succès';
                setTimeout(() => {
                    this.closeDialog.emit();
                    this.reload.emit();
                }, 2000);
            },
            error: (_) => {
                this.error = 'Une erreur est survenue, vérifiez vos données';
            },
        });
    }

    updateTicket() {
        const ticket: CreateTicketRequest = {
            title: this.ticketRequest.title,
            description: this.ticketRequest.description,
            price: this.ticketRequest.price,
            groupSize: this.ticketRequest.groupSize,
            quantity: this.ticketRequest.quantity,
        };
        this.ticketService.updateTicket(this.ticketRequest.id.toString(), ticket).subscribe({
            next: (_) => {
                this.success = 'Ticket bien mis à jour';
                setTimeout(() => {
                    this.closeDialog.emit();
                    this.reload.emit();
                }, 2000);
            },
            error: (_) => {
                this.error = 'Une erreur est survenue, vérifiez vos données';
            },
        });
    }

    ngOnInit(): void {
        if (this.ticket) {
            this.ticketRequest = this.ticket;
        }
    }

    updateGroupSize() {
        this.ticketRequest.groupSize = this.selectedNbrPeople?.value ?? 1;
    }

    updateQuantity() {
        this.ticketRequest.quantity = this.selectedStockOptions?.value ?? 1;
    }
}
