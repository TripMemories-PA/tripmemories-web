import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuizzComponent } from './welcome-quizz.component';

describe('WelcomeQuizzComponent', () => {
    let component: WelcomeQuizzComponent;
    let fixture: ComponentFixture<WelcomeQuizzComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WelcomeQuizzComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WelcomeQuizzComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
