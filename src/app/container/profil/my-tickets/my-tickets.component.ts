import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../services/profil/profil.service';
import { MyTicketsModel } from '../../../models/myTickets.model';
import { NgForOf, NgIf } from '@angular/common';
import { PostCardComponent } from '../../../components/post-card/post-card.component';
import { MyTicketCardComponent } from '../../../components/my-ticket-card/my-ticket-card.component';

@Component({
    selector: 'app-my-tickets',
    standalone: true,
    imports: [NgForOf, PostCardComponent, MyTicketCardComponent, NgIf],
    templateUrl: './my-tickets.component.html',
    styleUrl: './my-tickets.component.css',
})
export class MyTicketsComponent implements OnInit {
    constructor(private profilService: ProfilService) {}

    myTickets: MyTicketsModel[] = [];

    ngOnInit(): void {
        this.getMyTickets();
    }

    getMyTickets() {
        this.profilService.getMyTickets().subscribe({
            next: (response) => {
                this.myTickets = response;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
