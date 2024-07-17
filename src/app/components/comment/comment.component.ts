import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { TimeAgoPipe } from '../../time-ago.pipe';
import { NgClass, NgIf } from '@angular/common';
import { CommentsService } from '../../services/comments/comments.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-comment',
    standalone: true,
    imports: [
        AvatarModule,
        PanelModule,
        ButtonModule,
        TimeAgoPipe,
        NgIf,
        DialogModule,
        ProgressBarModule,
        ToastModule,
        MessageModule,
        NgClass,
    ],
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
    @Input() hasBeenReported?: boolean = false;
    @Input() date?: Date;
    @Output() emitter: EventEmitter<any> = new EventEmitter();

    visibleReportDialog: boolean = false;
    loading: boolean = false;
    success: boolean = false;

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

    reportComment() {
        if (this.commentId) {
            this.commentsService.reportComment(this.commentId).subscribe({
                next: (_) => {
                    this.success = true;
                    setTimeout(() => {
                        this.visibleReportDialog = false;
                        this.emitter.emit(true);
                    }, 3000);
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
