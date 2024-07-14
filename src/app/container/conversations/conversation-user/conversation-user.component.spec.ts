import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationUserComponent } from './conversation-user.component';

describe('ConversationUserComponent', () => {
    let component: ConversationUserComponent;
    let fixture: ComponentFixture<ConversationUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConversationUserComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConversationUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
