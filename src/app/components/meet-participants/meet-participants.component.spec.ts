import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetParticipantsComponent } from './meet-participants.component';
import { HttpClientModule } from '@angular/common/http';

describe('MeetParticipantsComponent', () => {
    let component: MeetParticipantsComponent;
    let fixture: ComponentFixture<MeetParticipantsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeetParticipantsComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetParticipantsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
