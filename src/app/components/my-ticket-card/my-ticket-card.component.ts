import { Component, Input, OnInit } from '@angular/core';
import { MyTicketsModel } from '../../models/myTickets.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { tick } from '@angular/core/testing';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'app-my-ticket-card',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        DialogModule,
        NgIf,
        NgOptimizedImage,
        ProgressBarModule,
        QRCodeModule,
    ],
    templateUrl: './my-ticket-card.component.html',
    styleUrl: './my-ticket-card.component.css',
})
export class MyTicketCardComponent implements OnInit {
    @Input() ticket?: MyTicketsModel;

    dateParsed: string[] = ['', ''];
    qrCodeValue: string = '';
    visible: boolean = false;
    loading: boolean = false;

    parseDate(date: Date | string): string[] {
        if (!date) {
            return ['', ''];
        }
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return ['', ''];
        }
        return [
            dateObj.toLocaleDateString('fr-FR'),
            dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        ];
    }

    ngOnInit(): void {
        if (this.ticket && this.ticket.createdAt) {
            this.dateParsed = this.parseDate(this.ticket.createdAt);
            this.qrCodeValue = this.ticket.qrCode;
        }
    }

    protected readonly tick = tick;
}
