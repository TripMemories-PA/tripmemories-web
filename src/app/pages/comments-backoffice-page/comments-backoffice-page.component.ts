import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
    selector: 'app-comments-backoffice-page',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule],
    templateUrl: './comments-backoffice-page.component.html',
    styleUrl: './comments-backoffice-page.component.css',
})
export class CommentsBackofficePageComponent implements OnInit {
    constructor(private commentService: CommentsService) {}

    comments: any[] = [];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;

    ngOnInit(): void {
        this.getComments();
    }

    getComments() {
        this.loading = true;
        this.commentService
            .getComments(this.currentPage.toString(), this.itemsPerPage.toString())
            .subscribe((res) => {
                this.comments = res.data;
                this.totalPages = res.meta.total;
                this.loading = false;
            });
    }

    onPageChange(event: any) {
        if (event.first === 0) {
            this.currentPage = 1;
            this.itemsPerPage = event.rows;
        } else {
            this.itemsPerPage = event.rows;
            this.currentPage = event.first / this.itemsPerPage + 1;
        }

        this.getComments();
    }

    deleteComment(id: number) {
        this.commentService.deletePostComment(id).subscribe(() => {
            this.getComments();
        });
    }
}
