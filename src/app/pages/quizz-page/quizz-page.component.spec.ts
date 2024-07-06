import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzPageComponent } from './quizz-page.component';
import { RouterModule } from '@angular/router';

describe('QuizzPageComponent', () => {
    let component: QuizzPageComponent;
    let fixture: ComponentFixture<QuizzPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuizzPageComponent, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(QuizzPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
