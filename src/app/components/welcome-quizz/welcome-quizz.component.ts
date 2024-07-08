import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-welcome-quizz',
    standalone: true,
    imports: [InputTextModule, ButtonModule],
    templateUrl: './welcome-quizz.component.html',
    styleUrl: './welcome-quizz.component.css',
})
export class WelcomeQuizzComponent {
    @Input() name? = '';
    @Input() poiName = '';
    @Input() nbrQuestions = 0;
    @Output() startQuiz: EventEmitter<any> = new EventEmitter();

    start() {
        if (!this.name) {
            return;
        }
        this.startQuiz.emit();
    }
}
