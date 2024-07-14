import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMeetComponent } from './conversation-meet.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('ConversationMeetComponent', () => {
    let component: ConversationMeetComponent;
    let fixture: ComponentFixture<ConversationMeetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConversationMeetComponent, HttpClientModule, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ConversationMeetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
