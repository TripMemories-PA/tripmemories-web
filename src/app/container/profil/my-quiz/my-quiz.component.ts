import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgForOf, NgIf } from '@angular/common';
import { PostCardComponent } from '../../../components/post-card/post-card.component';
import { CardQuestionsQuizComponent } from '../../../components/card-questions-quiz/card-questions-quiz.component';
import { PoisService } from '../../../services/pois/pois.service';
import { AuthService } from '../../../services/auth/auth.service';
import { QuestionModel } from '../../../models/question.model';
import { CreatePostCardComponent } from '../../../components/create-post-card/create-post-card.component';
import { DialogModule } from 'primeng/dialog';
import { MetaModel } from '../../../models/meta.model';
import { PaginatorModule } from 'primeng/paginator';
import { CreateQuestionComponent } from '../../../components/create-question/create-question.component';

@Component({
    selector: 'app-my-quiz',
    standalone: true,
    imports: [
        ButtonModule,
        NgForOf,
        PostCardComponent,
        CardQuestionsQuizComponent,
        CreatePostCardComponent,
        DialogModule,
        NgIf,
        PaginatorModule,
        CreateQuestionComponent,
    ],
    templateUrl: './my-quiz.component.html',
    styleUrl: './my-quiz.component.css',
})
export class MyQuizComponent implements OnInit {
    constructor(
        private poisService: PoisService,
        private authService: AuthService,
    ) {}

    questions: QuestionModel[] = [];
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

    ngOnInit() {
        if (!this.authService.user?.poiId) return;
        this.poisService.getPoiQuestions(this.authService.user?.poiId.toString()).subscribe({
            next: (response) => {
                this.questions = response.data;
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
        if (!this.authService.user?.poiId) return;
        if (event.page < 0 || event.page > this.totalPages) {
            return;
        }
        if (event.page + 1 === this.currentPage && event.rows === this.itemsPerPage) {
            return;
        }
        this.poisService
            .getPoiQuestions(this.authService.user?.poiId.toString(), event.page + 1, event.rows)
            .subscribe({
                next: (response) => {
                    this.questions = response.data;
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

    reloadQuestions() {
        if (!this.authService.user?.poiId) return;
        this.poisService.getPoiQuestions(this.authService.user?.poiId.toString()).subscribe({
            next: (response) => {
                this.questions = response.data;
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

    openDialog() {
        this.showDialog = true;
    }
}
