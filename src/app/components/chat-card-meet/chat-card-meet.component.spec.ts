import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCardMeetComponent } from './chat-card-meet.component';

describe('ChatCardMeetComponent', () => {
    let component: ChatCardMeetComponent;
    let fixture: ComponentFixture<ChatCardMeetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChatCardMeetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChatCardMeetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
