import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzPageComponent } from './quizz-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('QuizzPageComponent', () => {
    let component: QuizzPageComponent;
    let fixture: ComponentFixture<QuizzPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuizzPageComponent, HttpClientModule, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(QuizzPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
