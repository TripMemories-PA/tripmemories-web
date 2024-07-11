import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { MetaModel } from '../../models/meta.model';
import { FriendRequestResponse } from '../../models/response/friendRequest.response';

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
    meta: MetaModel = new MetaModel();

    currentPage: number = 1;

    firstPage: number = 1;
    totalPages: number = 1;
    lastPage: number = 1;
    firstPageUrl: string = '';
    lastPageUrl: string = '';
    nextPageUrl: string | null = '';
    previousPageUrl: string | null = '';

    itemsPerPage: number = 10;

    ngOnInit(): void {
        this.getUserRanking();
    }

    getUserRanking(page: number = 1, itemsPerPage: number = 10) {
        this.userServices.getUserRanking(itemsPerPage, page).subscribe({
            next: (response) => {
                this.users = response.data;
                this.meta = response.meta;
                this.currentPage = response.meta.currentPage;

                this.firstPage = response.meta.firstPage;
                this.totalPages = response.meta.total;
                this.lastPage = response.meta.lastPage;
                this.firstPageUrl = response.meta.firstPageUrl;
                this.lastPageUrl = response.meta.lastPageUrl;
                this.nextPageUrl = response.meta.nextPageUrl;
                this.previousPageUrl = response.meta.previousPageUrl;
                this.itemsPerPage = response.meta.perPage;
            },
        });
    }

    onPageChange(event: any) {
        let page = 0;
        if (event.first !== 0) {
            page = event.first / 10;
        }
        if (page < 0 || page > this.lastPage) {
            return;
        }
        if (page + 1 === this.currentPage && this.itemsPerPage === event.rows) {
            return;
        }
        this.getUserRanking(page + 1, event.rows);
    }

    goToUser(id: string) {
        this.router.navigate(['user', id]);
    }

    goToQuiz() {
        this.router.navigate(['quiz'], { queryParams: { general: 'true' } });
    }
}
