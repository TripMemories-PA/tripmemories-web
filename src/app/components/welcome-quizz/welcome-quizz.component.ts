import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-welcome-quizz',
    standalone: true,
    imports: [InputTextModule, ButtonModule, NgIf],
    templateUrl: './welcome-quizz.component.html',
    styleUrl: './welcome-quizz.component.css',
})
export class WelcomeQuizzComponent {
    @Input() name? = '';
    @Input() poiName = '';
    @Input() nbrQuestions = 0;
    @Output() startQuiz: EventEmitter<any> = new EventEmitter();

    start() {
        this.startQuiz.emit();
    }
}
