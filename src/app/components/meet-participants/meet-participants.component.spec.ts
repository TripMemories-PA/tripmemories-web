import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetParticipantsComponent } from './meet-participants.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';

describe('MeetParticipantsComponent', () => {
    let component: MeetParticipantsComponent;
    let fixture: ComponentFixture<MeetParticipantsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MeetParticipantsComponent,
                HttpClientModule,
                NgxStripeModule.forRoot('pk_test_51J4J5eL8'),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetParticipantsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
