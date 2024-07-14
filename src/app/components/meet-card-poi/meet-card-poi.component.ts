import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { format } from 'date-fns';

@Component({
    selector: 'app-meet-card-poi',
    standalone: true,
    imports: [
        RouterLink,
        NgOptimizedImage,
        NgIf,
        ButtonModule,
        CardModule,
        CreateTicketComponent,
        DialogModule,
        ProgressBarModule,
        SharedModule,
    ],
    templateUrl: './meet-card-poi.component.html',
    styleUrl: './meet-card-poi.component.css',
})
export class MeetCardPoiComponent implements OnInit {
    @Input() title?: string = '';
    @Input() image?: string;
    @Input() description?: string = '';
    @Input() priceTickets?: number = 0;
    @Input() totalParticipants?: string = '';
    @Input() date?: Date;
    @Input() link?: string = '';

    dateParsed: string = '';
    priceTicketsParsed: number = 0;
    isLoadingImage = true;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    get isLogged(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    goToMeet(): void {
        if (!this.link) {
            return;
        }
        this.router.navigate(['/meets', this.link]);
        console.log('Go to meet');
    }

    ngOnInit(): void {
        if (this.priceTickets) {
            this.priceTicketsParsed = parseInt(this.priceTickets.toString());
        }
        if (this.date) {
            this.dateParsed = format(this.date, 'dd/MM/yyyy');
        }
    }
}
