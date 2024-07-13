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
    show: boolean = false;
    @Output() setShowDialog: EventEmitter<any> = new EventEmitter();
    comments: CommentModel[] = [];
    id = this.authService.user?.id;

    ngOnInit(): void {
        this.openDialog();
        if (this.postId) {
            this.getComments(this.isAuth);
        }
    }

    get isAuth(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    openDialog(): void {
        this.show = true;
    }

    getComments(isConnected: boolean = false): void {
        if (!this.postId) {
            return;
        }
        this.postService.getPostComments(this.postId.toString(), '10', '1', isConnected).subscribe({
            next: (response) => {
                this.comments = response.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
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
