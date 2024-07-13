import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiModel } from '../../models/Poi.model';
import { MetaModel } from '../../models/meta.model';
import { PoisSearchResponse } from '../../models/response/pois.response';
import { PoisService } from '../../services/pois/pois.service';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MonumentCardComponent } from '../../components/monument-card/monument-card.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-search-page',
    standalone: true,
    imports: [
        InputTextModule,
        MessageModule,
        MonumentCardComponent,
        NgForOf,
        PaginatorModule,
        ProgressBarModule,
        NgOptimizedImage,
        NgIf,
    ],
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
    constructor(
        private poisService: PoisService,
        private _activatedRoute: ActivatedRoute,
    ) {}

    searchMonument = {
        monument: '',
    };

    error: string = '';
    loading: boolean = false;

    pois: PoiModel[] = [];
    sortedPois: PoiModel[] = [];
    value: string = '';

    itemsPerPage: number = 12;

    meta: MetaModel = new MetaModel();

    currentPage: number = 1;

    firstPage: number = 1;
    totalPages: number = 1;
    lastPage: number = 1;
    firstPageUrl: string = '';
    lastPageUrl: string = '';
    nextPageUrl: string | null = '';
    previousPageUrl: string | null = '';

    ngOnInit(): void {
        this._activatedRoute.queryParamMap.subscribe((params) => {
            const param = params.get('search');
            this.value = param as string;
            this.getPOIs(param);
        });
    }

    private getPOIs(param: string | null = null, page: number = 1, perPage: number = 12) {
        if (!param) {
            this.poisService.getPOIs(page.toString(), perPage.toString()).subscribe({
                next: (response) => {
                    this.loading = false;
                    this.pois = response.data;
                    this.sortedPois = [...this.pois];
                    this.meta = response.meta;
                    this.currentPage = response.meta.currentPage;
                    this.firstPage = response.meta.firstPage;
                    this.totalPages = response.meta.total;
                    this.lastPage = response.meta.lastPage;
                    this.firstPageUrl = response.meta.firstPageUrl;
                    this.lastPageUrl = response.meta.lastPageUrl;
                    this.nextPageUrl = response.meta.nextPageUrl;
                    this.previousPageUrl = response.meta.previousPageUrl;
                },
                error: (error) => {
                    this.loading = false;
                    this.error = error;
                },
            });
            return;
        }
        this.loading = true;
        this.poisService
            .getPOIs(page.toString(), perPage.toString(), undefined, undefined, undefined, param)
            .subscribe({
                next: (response) => {
                    this.loading = false;
                    this.pois = response.data;
                    this.sortedPois = [...this.pois];
                    this.meta = response.meta;
                    this.currentPage = response.meta.currentPage;
                    this.firstPage = response.meta.firstPage;
                    this.totalPages = response.meta.total;
                    this.lastPage = response.meta.lastPage;
                    this.firstPageUrl = response.meta.firstPageUrl;
                    this.lastPageUrl = response.meta.lastPageUrl;
                    this.nextPageUrl = response.meta.nextPageUrl;
                    this.previousPageUrl = response.meta.previousPageUrl;
                },
                error: (error) => {
                    this.loading = false;
                    this.error = error;
                },
            });
    }

    onPageChange(event: any) {
        if (event.page < 0 || event.page > this.totalPages) {
            return;
        }
        if (event.rows === this.itemsPerPage && event.page + 1 === this.currentPage) {
            return;
        }
        this.getPOIs(this.value, event.page + 1, event.rows);
    }

    sortSearch() {
        if (this.pois.length === 0) {
            this.getPOIs(this.searchMonument.monument, this.currentPage, this.itemsPerPage);
            return;
        }
        if (this.searchMonument.monument === '') {
            this.getPOIs();
        } else {
            if (
                this.sortedPois.some(
                    (poi) =>
                        !poi.name
                            ?.toLowerCase()
                            .includes(this.searchMonument.monument.toLowerCase()),
                )
            ) {
                this.getPOIs(this.searchMonument.monument, this.currentPage, this.itemsPerPage);
                return;
            }
            this.sortedPois = this.pois.filter((poi) =>
                poi.name?.toLowerCase().includes(this.searchMonument.monument.toLowerCase()),
            );
        }
    }
}
