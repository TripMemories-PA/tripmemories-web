import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { SummaryQuizModel } from '../../models/summaryQuiz.model';

@Component({
    selector: 'app-end-quiz',
    standalone: true,
    imports: [ButtonModule, InputTextModule, RouterLink, NgForOf],
    templateUrl: './end-quiz.component.html',
    styleUrl: './end-quiz.component.css',
})
export class EndQuizComponent {
    @Input() score: number = 0;
    @Input() name?: string = '';
    @Input() nbrQuestions: number = 0;
    @Input() poiName: string = '';
    @Input() answers: SummaryQuizModel[] = [];
}
