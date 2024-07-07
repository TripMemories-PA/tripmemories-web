import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuestionsQuizComponent } from './card-questions-quiz.component';

describe('CardQuestionsQuizComponent', () => {
    let component: CardQuestionsQuizComponent;
    let fixture: ComponentFixture<CardQuestionsQuizComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardQuestionsQuizComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardQuestionsQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
