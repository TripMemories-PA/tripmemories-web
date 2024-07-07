import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth/auth.service';
import { PoisService } from '../../services/pois/pois.service';
import { QuestionModel } from '../../models/question.model';
import { QuestionComponent } from '../../components/question/question.component';
import { NgIf } from '@angular/common';
import { WelcomeQuizzComponent } from '../../components/welcome-quizz/welcome-quizz.component';

@Component({
    selector: 'app-quizz-page',
    standalone: true,
    imports: [RouterLink, InputTextModule, QuestionComponent, NgIf, WelcomeQuizzComponent],
    templateUrl: './quizz-page.component.html',
    styleUrl: './quizz-page.component.css',
})
export class QuizzPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private poiService: PoisService,
    ) {}

    quizzStarted = false;
    indexQuestion = 0;
    name = this.authService.user?.firstname + ' ' + this.authService.user?.lastname;
    idQuizz = '';
    nbrQuestions = 10;
    questions: QuestionModel[] = [];
    question: QuestionModel = this.questions[this.indexQuestion];
    score = 0;

    startQuiz() {
        //this.router.navigate(['/quizz', this.idQuizz, '1']);
        this.quizzStarted = true;
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
                            this.nbrQuestions = 15;
                            break;
                        default:
                            this.nbrQuestions = 10;
                            break;
                    }
                }
                this.getPoiQuestions();
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
            });
    }

    nextQuestion(isCorrect: boolean) {
        if (isCorrect) {
            this.score += 10;
        } else {
            this.score -= 5;
        }
        this.indexQuestion += 1;
        this.question = this.questions[this.indexQuestion];
    }
}
