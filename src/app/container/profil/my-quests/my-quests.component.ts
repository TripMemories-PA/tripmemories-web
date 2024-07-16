import { Component, OnInit } from '@angular/core';
import { QuestService } from '../../../services/quest/quest.service';
import { PoisService } from '../../../services/pois/pois.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MetaModel } from '../../../models/meta.model';
import { QuestModel } from '../../../models/quest.model';
import { ButtonModule } from 'primeng/button';
import { CreatePostCardComponent } from '../../../components/create-post-card/create-post-card.component';
import { DialogModule } from 'primeng/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { MyMissionCardComponent } from '../../../components/my-mission-card/my-mission-card.component';
import { CreateQuestComponent } from '../../../components/create-quest/create-quest.component';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-my-quests',
    standalone: true,
    imports: [
        ButtonModule,
        CreatePostCardComponent,
        DialogModule,
        NgForOf,
        PaginatorModule,
        MyMissionCardComponent,
        NgIf,
        CreateQuestComponent,
        ProgressBarModule,
    ],
    templateUrl: './my-quests.component.html',
    styleUrl: './my-quests.component.css',
})
export class MyQuestsComponent implements OnInit {
    constructor(
        private poisService: PoisService,
        private questService: QuestService,
        private authService: AuthService,
    ) {}

    poiId: number = -1;

    quests: QuestModel[] = [];

    meta: MetaModel = new MetaModel();

    currentPage: number = 1;
    itemsPerPage: number = 12;

    firstPage: number = 1;
    totalPages: number = 1;
    lastPage: number = 1;
    firstPageUrl: string = '';
    lastPageUrl: string = '';
    nextPageUrl: string | null = '';
    previousPageUrl: string | null = '';
    showDialog: boolean = false;

    loading: boolean = false;

    ngOnInit(): void {
        this.loading = true;
        if (this.authService.user?.access_token && this.authService.user.userTypeId === 3) {
            this.poiId = this.authService.user.poiId as number;
            this.poisService.getPoiQuests(this.poiId.toString(), '1', '12', true).subscribe({
                next: (response) => {
                    this.quests = response.data;
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
    }

    onPageChange(event: any) {
        if (event.page < 0 || event.page > this.totalPages) {
            return;
        }
        if (event.page + 1 === this.currentPage && event.rows === this.itemsPerPage) {
            return;
        }
        this.poisService
            .getPoiQuests(this.poiId.toString(), event.page + 1, event.rows, true)
            .subscribe({
                next: (response) => {
                    this.quests = response.data;
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
                error: (error) => {},
            });
    }

    reloadQuests() {
        this.showDialog = false;
        this.poisService.getPoiQuests(this.poiId.toString(), '1', '12', true).subscribe({
            next: (response) => {
                this.quests = response.data;
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
            error: (error) => {},
        });
    }

    openDialog() {
        this.showDialog = true;
    }
}
