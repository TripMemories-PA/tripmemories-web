import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../services/profil/profil.service';
import { MeetModel } from '../../../models/meet.model';
import { MetaModel } from '../../../models/meta.model';
import { ButtonModule } from 'primeng/button';
import { CreatePostCardComponent } from '../../../components/create-post-card/create-post-card.component';
import { DialogModule } from 'primeng/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { CreateMeetCardComponent } from '../../../components/create-meet-card/create-meet-card.component';
import { MeetCardComponent } from '../../../components/meet-card/meet-card.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-my-meets',
    standalone: true,
    imports: [
        ButtonModule,
        CreatePostCardComponent,
        DialogModule,
        NgForOf,
        PaginatorModule,
        NgIf,
        CreateMeetCardComponent,
        MeetCardComponent,
        ProgressBarModule,
    ],
    templateUrl: './my-meets.component.html',
    styleUrl: './my-meets.component.css',
})
export class MyMeetsComponent implements OnInit {
    meets: MeetModel[] = [];
    meta: MetaModel = new MetaModel();
    loading: boolean = false;

    currentPage: number = 1;
    itemsPerPage: number = 10;

    firstPage: number = 1;
    totalPages: number = 1;
    lastPage: number = 1;
    firstPageUrl: string = '';
    lastPageUrl: string = '';
    nextPageUrl: string | null = '';
    previousPageUrl: string | null = '';
    showDialog: boolean = false;

    constructor(
        private profilService: ProfilService,
        private authService: AuthService,
    ) {}

    openDialog() {
        this.showDialog = true;
    }

    get idUser(): string | number | undefined {
        if (!this.authService.user?.id) {
            return undefined;
        }
        return this.authService.user?.id as unknown as number;
    }

    getMeets(page: number = 1, perPage: number = 10): void {
        this.profilService.getMyMeets(page, perPage).subscribe({
            next: (response) => {
                this.meets = response.data;
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
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error(error);
            },
        });
    }

    reloadMeets() {
        this.showDialog = false;
        this.getMeets();
    }

    onPageChange(event: any) {
        if (event.page < 0 || event.page > this.totalPages) {
            return;
        }
        if (event.page + 1 === this.currentPage && event.rows === this.itemsPerPage) {
            return;
        }
        this.getMeets(event.page + 1, event.rows);
    }

    ngOnInit(): void {
        this.loading = true;
        this.getMeets();
    }
}
