import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetCardComponent } from './create-meet-card.component';

describe('CreateMeetCardComponent', () => {
    let component: CreateMeetCardComponent;
    let fixture: ComponentFixture<CreateMeetCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateMeetCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateMeetCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
