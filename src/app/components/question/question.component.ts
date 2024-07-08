import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgClass, NgForOf, NgIf, NgOptimizedImage, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { QuestionModel } from '../../models/question.model';
import { QuizzService } from '../../services/quizz/quizz.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        ProgressBarModule,
        NgOptimizedImage,
        NgForOf,
        ButtonModule,
        NgClass,
        NgIf,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent implements OnInit, OnChanges {
    constructor(
        private _location: Location,
        private quizzService: QuizzService,
        protected authService: AuthService,
        private messageService: MessageService,
    ) {}

    selectedAnswer: number = -1;
    hasValidate = false;
    isCorrect = false;
    totalScore = 0;
    timer = 0;

    @Input() nbrQuestion = 1;
    @Input() totalQuestions = 10;
    @Input() questionModel?: QuestionModel;
    @Output() nextQuestion: EventEmitter<any> = new EventEmitter();
    @Input() score = 0;

    ngOnInit(): void {
        if (!this.questionModel) {
            this._location.back();
        }
        if (this.authService.user?.score) {
            this.totalScore = this.authService.user.score;
        }
    }

    ngOnChanges(_: SimpleChanges): void {
        setTimeout(() => {
            this.updateTimer();
        }, 1500);
    }

    private updateTimer() {
        const interval = setInterval(() => {
            if (this.timer === 10) {
                clearInterval(interval);
                this.timer = 0;
                if (this.selectedAnswer === -1) {
                    this.messageService.add({
                        severity: 'error',
                        summary: "Mince tu n'as pas répondu à temps !",
                        detail: "Ne t'inquiète pas tu peux te rattraper !",
                    });
                    this.nextQuestion.emit(false);
                } else {
                    this.goNextQuestion();
                }
            } else {
                this.timer += 1;
            }
        }, 1000);
    }

    chooseAnswer(index: number) {
        this.selectedAnswer = index;
    }

    goNextQuestion() {
        if (!this.questionModel) {
            this._location.back();
            return;
        }
        this.quizzService
            .validateAnswerQuestion(
                this.questionModel.id.toString(),
                this.selectedAnswer.toString(),
            )
            .subscribe({
                next: (response) => {
                    this.hasValidate = true;
                    this.isCorrect = response.isCorrect;
                    if (response.isCorrect) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Réponse correcte',
                            detail: 'Bravo continue comme ça !',
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Réponse incorrecte',
                            detail: "Ne t'inquiète pas tu peux te rattraper !",
                        });
                    }
                    setTimeout(() => {
                        this.hasValidate = false;
                        this.selectedAnswer = -1;
                        this.totalScore += response.isCorrect ? 10 : -5;
                        this.nextQuestion.emit(response.isCorrect);
                    }, 2000);
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }
}
