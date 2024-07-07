import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [ProgressBarModule, NgOptimizedImage, NgForOf, ButtonModule, NgClass],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent {
    question = 'What is the name of the house of Harry Potter at Hogwarts?';
    answers = [
        { label: 'Hufflepuff', value: 'Hufflepuff' },
        { label: 'Gryffindor', value: 'Gryffindor' },
        { label: 'Ravenclaw', value: 'Ravenclaw' },
        { label: 'Slytherin', value: 'Slytherin' },
    ];
    selectedAnswer = 'Gryffindor';
}
