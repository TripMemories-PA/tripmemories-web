import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'primeng/api';
import { PostsService } from '../../../services/posts/posts.service';
import { CommentModel } from '../../../models/comment.model';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { CommentComponent } from '../../../components/comment/comment.component';
import { CommentFormComponent } from '../../../components/comment-form/comment-form.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-comments-section',
    standalone: true,
    imports: [
        DialogModule,
        SharedModule,
        NgOptimizedImage,
        CommentComponent,
        NgForOf,
        CommentFormComponent,
        ButtonModule,
    ],
    templateUrl: './comments-section.component.html',
    styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent implements OnInit {
    constructor(
        private postService: PostsService,
        private authService: AuthService,
    ) {}

    @Input() postId?: string | number = '';
    @Input() postUrl?: string = '';
    @Input() showDialog: boolean = false;
    @Output() setShowDialog: EventEmitter<any> = new EventEmitter();

    nbrPageComments: number = 1;
    show: boolean = false;
    comments: CommentModel[] = [];
    id = this.authService.user?.id;

    nbrComments: number = 0;

    ngOnInit(): void {
        this.openDialog();
        if (this.postId) {
            this.getComments(1, this.isAuth);
        }
    }

    get isAuth(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    openDialog(): void {
        this.show = true;
    }

    getComments(page: number = 1, isConnected: boolean = false): void {
        if (!this.postId) {
            return;
        }
        this.postService
            .getPostComments(this.postId.toString(), '10', page.toString(), isConnected)
            .subscribe({
                next: (response) => {
                    this.nbrPageComments += 1;
                    this.nbrComments = response.meta.total;
                    this.comments = this.comments.concat(response.data);
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }

    loadInitialComments(): void {
        if (!this.postId) {
            return;
        }
        this.postService.getPostComments(this.postId.toString(), '10', '1', this.isAuth).subscribe({
            next: (response) => {
                this.nbrPageComments = 2;
                this.nbrComments = response.meta.total;
                this.comments = response.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    scrollComments(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToBottom =
            element.scrollHeight - element.scrollTop === element.clientHeight;

        if (isScrolledToBottom) {
            this.getComments(this.nbrPageComments, this.isAuth);
        }
    }

    get IdAuthor(): number {
        if (this.authService.user?.id) {
            return parseInt(this.authService.user.id);
        }
        return -1;
    }

    onCloseDialog(): void {
        this.setShowDialog.emit(false);
    }
}
