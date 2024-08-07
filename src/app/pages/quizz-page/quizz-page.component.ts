import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth/auth.service';
import { PoisService } from '../../services/pois/pois.service';
import { QuestionModel } from '../../models/question.model';
import { QuestionComponent } from '../../components/question/question.component';
import { NgIf } from '@angular/common';
import { WelcomeQuizzComponent } from '../../components/welcome-quizz/welcome-quizz.component';
import { EndQuizComponent } from '../../components/end-quiz/end-quiz.component';
import { SummaryQuizModel } from '../../models/summaryQuiz.model';
import { QuizzService } from '../../services/quizz/quizz.service';

@Component({
    selector: 'app-quizz-page',
    standalone: true,
    imports: [
        RouterLink,
        InputTextModule,
        QuestionComponent,
        NgIf,
        WelcomeQuizzComponent,
        EndQuizComponent,
    ],
    templateUrl: './quizz-page.component.html',
    styleUrl: './quizz-page.component.css',
})
export class QuizzPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private poiService: PoisService,
        private quizService: QuizzService,
    ) {}

    summary: SummaryQuizModel[] = [];

    endQuiz = false;
    quizStarted = false;
    indexQuestion = 0;
    name? = this.authService.user
        ? this.authService.user?.firstname + ' ' + this.authService.user?.lastname
        : undefined;
    idQuizz = '';
    nbrQuestions = 10;
    questions: QuestionModel[] = [];
    question: QuestionModel = this.questions[this.indexQuestion];
    poiName: string = '';
    score = 0;

    startQuiz() {
        this.quizStarted = true;
        this.question = this.questions[0];
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.idQuizz = params.get('id') as string;
            this._activatedRoute.queryParamMap.subscribe((query) => {
                if (query.get('difficulty')) {
                    switch (query.get('difficulty')) {
                        case 'easy':
                            this.nbrQuestions = 5;
                            break;
                        case 'medium':
                            this.nbrQuestions = 10;
                            break;
                        case 'hard':
                            this.nbrQuestions = 20;
                            break;
                        default:
                            this.nbrQuestions = 10;
                            break;
                    }
                }
                if (query.has('general') || !params.has('id')) {
                    this.getGeneralQuestions();
                } else {
                    this.getPoiQuestions();
                }
            });
        });
    }

    getPoiQuestions() {
        if (!this.idQuizz) {
            return;
        }
        this.poiService
            .getPoiQuestions(this.idQuizz, '1', this.nbrQuestions.toString())
            .subscribe((questions) => {
                this.questions = questions.data;
                this.nbrQuestions = questions.data.length;
                if (questions.data.length > 0) {
                    this.poiName = questions.data[0].poi.name as string;
                }
            });
    }

    getGeneralQuestions() {
        this.quizService.getQuestions('1', this.nbrQuestions.toString()).subscribe({
            next: (questions) => {
                this.questions = questions.data;
                this.nbrQuestions = questions.data.length;
            },
        });
    }

    nextQuestion(isCorrect?: boolean) {
        let correct = false;
        if (isCorrect) {
            this.score += 10;
            correct = true;
        } else if (isCorrect !== undefined && !isCorrect) {
            this.score -= 5;
        } else {
            this.score -= 0;
        }
        this.indexQuestion += 1;
        if (this.indexQuestion >= this.nbrQuestions) {
            this.endQuiz = true;
            this.quizStarted = false;
            this.summary.push({
                question: this.question,
                isCorrect: correct,
            });
            return;
        }
        this.summary.push({
            question: this.question,
            isCorrect: correct,
        });
        this.question = this.questions[this.indexQuestion];
    }
}
