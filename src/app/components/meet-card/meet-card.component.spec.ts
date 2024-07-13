import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetCardComponent } from './meet-card.component';

describe('MeetCardComponent', () => {
    let component: MeetCardComponent;
    let fixture: ComponentFixture<MeetCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeetCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
