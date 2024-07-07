import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-ranking-page',
    standalone: true,
    imports: [
        ButtonModule,
        NgForOf,
        TicketCardComponent,
        TableModule,
        NgIf,
        NgOptimizedImage,
        RouterLink,
    ],
    templateUrl: './ranking-page.component.html',
    styleUrl: './ranking-page.component.css',
})
export class RankingPageComponent implements OnInit {
    constructor(
        private userServices: UsersService,
        private router: Router,
    ) {}

    users: User[] = [];

    ngOnInit(): void {
        this.userServices.getUserRanking().subscribe({
            next: (response) => {
                this.users = response.data;
            },
        });
    }

    goToUser(id: string) {
        this.router.navigate(['user', id]);
    }
}
