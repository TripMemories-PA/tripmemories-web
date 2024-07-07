import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { DialogModule } from 'primeng/dialog';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'primeng/api';
import { QuestionModel } from '../../models/question.model';
import { QuizzService } from '../../services/quizz/quizz.service';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
    selector: 'app-card-questions-quiz',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        CreateTicketComponent,
        DialogModule,
        NgIf,
        NgOptimizedImage,
        ProgressBarModule,
        SharedModule,
        CreateQuestionComponent,
    ],
    templateUrl: './card-questions-quiz.component.html',
    styleUrl: './card-questions-quiz.component.css',
})
export class CardQuestionsQuizComponent {
    @Input() question?: QuestionModel;
    @Output() reload: EventEmitter<any> = new EventEmitter();
    visible: boolean = false;
    visibleDelete: boolean = false;
    loading: boolean = false;

    constructor(private questionService: QuizzService) {}

    deleteQuestion() {
        if (!this.question) return;
        this.loading = true;
        this.questionService.deleteQuestion(this.question.id.toString()).subscribe({
            next: () => {
                this.loading = false;
                this.visible = false;
                this.reload.emit();
            },
            error: () => {
                this.loading = false;
            },
        });
    }
}
