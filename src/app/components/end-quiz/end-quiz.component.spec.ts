import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndQuizComponent } from './end-quiz.component';
import { RouterModule } from '@angular/router';

describe('EndQuizComponent', () => {
    let component: EndQuizComponent;
    let fixture: ComponentFixture<EndQuizComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EndQuizComponent, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(EndQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
