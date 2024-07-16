import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ConfigService } from '../../../services/config/config.service';

import { ConversationUserComponent } from './conversation-user.component';

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

describe('ConversationUserComponent', () => {
    let component: ConversationUserComponent;
    let fixture: ComponentFixture<ConversationUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([])],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jest
                        .requireMock('../../../services/config/config.service')
                        .ConfigService(),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ConversationUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
