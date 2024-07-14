import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommentPostRequest } from '../../models/request/commentPost.request';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
    selector: 'app-comment-form',
    standalone: true,
    imports: [InputTextareaModule, FormsModule, ButtonModule],
    templateUrl: './comment-form.component.html',
    styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
    @Input() postId?: string | number = '';

    @Output() emitter: EventEmitter<any> = new EventEmitter();
    @ViewChild('comment') commentForm!: ElementRef<HTMLTextAreaElement>;

    content: string = '';

    constructor(private commentsService: CommentsService) {}

    postComment() {
        if (!this.content || !this.postId) {
            return;
        }
        const comment: CommentPostRequest = {
            content: this.content,
            postId: this.postId,
        };

        this.commentsService.storePostComments(comment).subscribe({
            next: (_) => {
                this.emitter.emit();
                this.commentForm.nativeElement.value = '';
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
