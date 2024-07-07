import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { PoisService } from '../../services/pois/pois.service';

@Component({
    selector: 'app-shop-page',
    standalone: true,
    imports: [TicketCardComponent, NgForOf, ButtonModule, DialogModule, CreateTicketComponent],
    templateUrl: './shop-page.component.html',
    styleUrl: './shop-page.component.css',
})
export class ShopPageComponent implements OnInit {
    tickets: TicketModel[] = [];
    visible = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private poisService: PoisService,
    ) {}

    ngOnInit() {
        if (!this.authService.user) {
            this.router.navigate(['/login']);
            return;
        }
        if (this.authService.user.userTypeId !== 3 && this.authService.user.userTypeId !== 1) {
            this.router.navigate(['/']);
            return;
        }
        this.getPoiTickets();
    }

    getPoiTickets() {
        if (!this.authService.user?.poiId) {
            return;
        }
        this.poisService.getPoisTickets(this.authService.user.poiId.toString()).subscribe({
            next: (value: any) => {
                this.tickets = value;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
