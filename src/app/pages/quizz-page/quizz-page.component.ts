import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-quizz-page',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './quizz-page.component.html',
    styleUrl: './quizz-page.component.css',
})
export class QuizzPageComponent {
    @ViewChild('name') nameKey!: ElementRef;
    constructor() {}

    startQuiz() {
        localStorage.setItem('name', this.nameKey.nativeElement.value);
    }
}
