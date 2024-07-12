import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardComponent } from './payment-card.component';
import { NgxStripeModule } from 'ngx-stripe';

describe('PaymentCardComponent', () => {
    let component: PaymentCardComponent;
    let fixture: ComponentFixture<PaymentCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentCardComponent, NgxStripeModule.forRoot('pk_test_51J4J5eL8')],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
