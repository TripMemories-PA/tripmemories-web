import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { TimeAgoPipe } from '../../time-ago.pipe';
import { NgIf } from '@angular/common';
import { CommentsService } from '../../services/comments/comments.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-comment',
    standalone: true,
    imports: [AvatarModule, PanelModule, ButtonModule, TimeAgoPipe, NgIf],
    providers: [MessageService],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.css',
})
export class CommentComponent {
    @Input() commentId?: string | number;
    @Input() comment?: string;
    @Input() isLiked?: boolean;
    @Input() isMyComment?: boolean;
    @Input() author?: User;
    @Input() nbrLikes?: number;
    @Input() date?: Date;
    @Output() emitter: EventEmitter<any> = new EventEmitter();

    constructor(
        private commentsService: CommentsService,
        private messageService: MessageService,
    ) {}

    like() {
        if (this.commentId) {
            this.commentsService.likeComment(this.commentId).subscribe({
                next: (_) => {
                    this.emitter.emit(true);
                    this.isLiked = true;
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: error.error.message,
                    });
                },
            });
        }
    }

    dislike() {
        if (this.commentId) {
            this.commentsService.dislikeComment(this.commentId).subscribe({
                next: (_) => {
                    this.emitter.emit(true);
                    this.isLiked = false;
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: error.error.message,
                    });
                },
            });
        }
    }

    deleteComment() {
        if (this.commentId) {
            this.commentsService.deletePostComment(this.commentId).subscribe({
                next: (_) => {
                    this.emitter.emit(true);
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: error.error.message,
                    });
                },
            });
        }
    }
}
