import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetPageComponent } from './meet-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';

describe('MeetPageComponent', () => {
    let component: MeetPageComponent;
    let fixture: ComponentFixture<MeetPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MeetPageComponent,
                RouterModule.forRoot([]),
                HttpClientModule,
                NgxStripeModule.forRoot('pk_test_51J4J5eL8'),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
