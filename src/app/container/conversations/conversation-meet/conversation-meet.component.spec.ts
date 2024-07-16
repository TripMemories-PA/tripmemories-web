import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMeetComponent } from './conversation-meet.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../services/config/config.service';

jest.mock('../../../services/config/config.service', () => {
    return {
        ConfigService: jest.fn().mockImplementation(() => ({
            stripePublicKey: 'fake_stripe_public_key',
            pusherAppKey: 'fake_pusher_app_key',
            pusherAppCluster: 'fake_pusher_cluster',
            pusherAppSecret: 'fake_pusher_app_secret',
            pusherAppId: 'fake_pusher_app_id',
        })),
    };
});

describe('ConversationMeetComponent', () => {
    let component: ConversationMeetComponent;
    let fixture: ComponentFixture<ConversationMeetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConversationMeetComponent, HttpClientModule, RouterModule.forRoot([])],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jest
                        .requireMock('../../../services/config/config.service')
                        .ConfigService(),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ConversationMeetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
