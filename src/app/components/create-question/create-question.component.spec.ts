import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionComponent } from './create-question.component';
import { HttpClientModule } from '@angular/common/http';

describe('CreateQuestionComponent', () => {
    let component: CreateQuestionComponent;
    let fixture: ComponentFixture<CreateQuestionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateQuestionComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
