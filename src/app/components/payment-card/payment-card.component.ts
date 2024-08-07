import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import {
    StripeCardComponent,
    StripeCardCvcComponent,
    StripeCardExpiryComponent,
    StripeCardNumberComponent,
    StripeElementsDirective,
    StripeService,
} from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket/basket.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-payment-card',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        MessageModule,
        NgIf,
        PaginatorModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SharedModule,
        StripeCardComponent,
        StripeElementsDirective,
        StripeCardNumberComponent,
        StripeCardExpiryComponent,
        StripeCardCvcComponent,
        NgOptimizedImage,
    ],
    templateUrl: './payment-card.component.html',
    styleUrl: './payment-card.component.css',
})
export class PaymentCardComponent {
    @Input() showPaymentDialog = false;
    @Output() emitter: EventEmitter<any> = new EventEmitter();
    @Output() closeDialog: EventEmitter<any> = new EventEmitter();
    @Input() paymentIntent = '';
    @Input() amount: string | number = 0;

    successMessage = '';
    errorMessage? = '';
    loading = false;
    isPaymentConfirmed = false;

    constructor(
        protected stripeService: StripeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private basketService: BasketService,
    ) {}

    @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
    @ViewChild(StripeCardNumberComponent) cardNumber!: StripeCardNumberComponent;
    @ViewChild(StripeCardExpiryComponent) cardExpiry!: StripeCardExpiryComponent;
    @ViewChild(StripeCardCvcComponent) cardCvc!: StripeCardCvcComponent;
    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Urbanist", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0',
                },
            },
        },
    };

    elementsOptions: StripeElementsOptions = {
        locale: 'fr-FR',
    };
    checkoutForm = this.fb.group({
        name: ['', [Validators.required]],
    });

    private get email(): string {
        return this.authService.user?.email ?? '';
    }

    payWithStripe(): void {
        this.loading = true;
        const name = this.checkoutForm.get('name')?.value;
        const email = this.email;

        this.stripeService
            .confirmCardPayment(this.paymentIntent, {
                payment_method: {
                    card: this.cardNumber.element,
                    billing_details: { name, email },
                },
            })
            .subscribe((result) => {
                if (result.error) {
                    this.loading = false;
                    this.errorMessage = result.error.message;
                    console.error('Payment failed', result.error.message);
                } else if (result.paymentIntent.status === 'succeeded') {
                    this.loading = false;
                    this.basketService.clearBasket();
                    this.successMessage = 'Payment succeeded!';
                    this.emitter.emit();
                    setTimeout(() => {
                        this.closeDialog.emit(false);
                    }, 6000);
                    console.log('Payment succeeded!');
                }
            });
    }
}
