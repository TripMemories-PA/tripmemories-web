import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostCardComponent } from '../../../components/post-card/post-card.component';
import { ProfilService } from '../../../services/profil/profil.service';
import { PostModel } from '../../../models/post.model';
import { NgForOf, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { MetaModel } from '../../../models/meta.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CreatePostCardComponent } from '../../../components/create-post-card/create-post-card.component';
import { PoisService } from '../../../services/pois/pois.service';

@Component({
    selector: 'app-my-posts',
    standalone: true,
    imports: [
        PostCardComponent,
        NgForOf,
        NgIf,
        PaginatorModule,
        ButtonModule,
        DialogModule,
        CreatePostCardComponent,
    ],
    templateUrl: './my-posts.component.html',
    styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit, OnChanges {
    @Input() userId: number = 1;
    @Input() poiId: number = -1;

    posts: PostModel[] = [];

    meta: MetaModel = new MetaModel();

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
        private poiService: PoisService,
    ) {}

    ngOnInit(): void {
        if (!this.userId || this.userId === -1) {
            return;
        }
        if (this.userId === 3) {
            this.poiService.getPoiPosts(this.poiId.toString()).subscribe({
                next: (response) => {
                    this.posts = response.data;
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
                error: (error) => {
                    console.error(error);
                },
            });
        } else {
            this.profilService.getPosts().subscribe({
                next: (response) => {
                    this.posts = response.data;
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
                error: (error) => {
                    console.error(error);
                },
            });
        }
    }

    openDialog() {
        this.showDialog = true;
    }

    onPageChange(event: any) {
        if (event.page < 0 || event.page > this.totalPages) {
            return;
        }
        if (event.page + 1 === this.currentPage && event.rows === this.itemsPerPage) {
            return;
        }

        if (this.userId === 3) {
            this.poiService
                .getPoiPosts(this.poiId.toString(), event.rows, event.page + 1)
                .subscribe({
                    next: (response) => {
                        this.posts = response.data;
                        this.meta = response.meta;
                        this.currentPage = response.meta.currentPage;
                        this.firstPage = response.meta.firstPage;
                        this.totalPages = response.meta.total;
                        this.lastPage = response.meta.lastPage;
                        this.firstPageUrl = response.meta.firstPageUrl;
                        this.lastPageUrl = response.meta.lastPageUrl;
                        this.nextPageUrl = response.meta.nextPageUrl;
                        this.previousPageUrl = response.meta.previousPageUrl;
                        this.itemsPerPage = event.rows;
                    },
                    error: (error) => {
                        console.error(error);
                    },
                });
        } else {
            this.profilService.getPosts(event.page + 1, event.rows).subscribe({
                next: (response) => {
                    this.posts = response.data;
                    this.meta = response.meta;
                    this.currentPage = response.meta.currentPage;
                    this.firstPage = response.meta.firstPage;
                    this.totalPages = response.meta.total;
                    this.lastPage = response.meta.lastPage;
                    this.firstPageUrl = response.meta.firstPageUrl;
                    this.lastPageUrl = response.meta.lastPageUrl;
                    this.nextPageUrl = response.meta.nextPageUrl;
                    this.previousPageUrl = response.meta.previousPageUrl;
                    this.itemsPerPage = event.rows;
                },
                error: (error) => {
                    console.error(error);
                },
            });
        }
    }

    ngOnChanges(_: SimpleChanges): void {
        if (this.userId === 3) {
            this.poiService.getPoiPosts(this.poiId.toString()).subscribe({
                next: (response) => {
                    this.posts = response.data;
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
                error: (error) => {
                    console.error(error);
                },
            });
        } else {
            this.profilService.getPosts().subscribe({
                next: (response) => {
                    this.posts = response.data;
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
                error: (error) => {
                    console.error(error);
                },
            });
        }
    }
}
