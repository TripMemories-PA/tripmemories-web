import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { BasketService } from '../../services/basket/basket.service';
import { TicketModel } from '../../models/ticket.model';
import { ProfilService } from '../../services/profil/profil.service';
import { TicketBuyRequest } from '../../models/request/ticketBuy.request';
import { StripeCardComponent, StripeElementsDirective, StripeService } from 'ngx-stripe';
import { DialogModule } from 'primeng/dialog';
import { FriendRequestCardComponent } from '../friend-request-card/friend-request-card.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { BuyTicketsResponse } from '../../models/response/buyTickets.response';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { PaymentCardComponent } from '../payment-card/payment-card.component';

@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [
        TableModule,
        ToastModule,
        FormsModule,
        PaginatorModule,
        ButtonModule,
        DialogModule,
        FriendRequestCardComponent,
        NgForOf,
        ReactiveFormsModule,
        InputTextModule,
        StripeCardComponent,
        StripeElementsDirective,
        MessageModule,
        NgIf,
        ProgressBarModule,
        CardModule,
        NgOptimizedImage,
        PaymentCardComponent,
    ],
    providers: [MessageService, StripeService],
    templateUrl: './basket.component.html',
    styleUrl: './basket.component.css',
})
export class BasketComponent {
    cartItems: TicketModel[];
    showPaymentDialog = false;
    paymentIntent = '';
    successMessage = '';
    errorMessage? = '';
    loading = false;
    isPaymentConfirmed = false;

    @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
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
        email: ['', [Validators.required, Validators.email]],
    });

    constructor(
        private messageService: MessageService,
        private basketService: BasketService,
        private profilService: ProfilService,
        protected stripeService: StripeService,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.cartItems = this.basketService.getBasket();
    }

    getTotal(): string {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }

    updateQuantity(item: TicketModel, quantity: number): void {
        if (quantity < 1) {
            return;
        }
        item.quantity = quantity;
        this.basketService.updateTicket(item);
    }

    removeItem(item: TicketModel): void {
        this.basketService.removeTicket(item.id);
        this.cartItems = this.basketService.getBasket();
        this.messageService.add({
            severity: 'info',
            summary: 'Retiré',
            detail: `Le billet ${item.title} a été retiré du panier`,
        });
    }

    addItem(item: TicketModel): void {
        this.basketService.addTicket(item);
        this.cartItems = this.basketService.getBasket();
        this.messageService.add({
            severity: 'success',
            summary: 'Ajouté',
            detail: 'Le billet a été ajouté au panier',
        });
    }

    closeDialog(): void {
        this.showPaymentDialog = false;
    }

    updateCartItems(): void {
        this.cartItems = [];
    }

    pay(): void {
        const ticketBuy: TicketBuyRequest = {
            tickets: this.cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
        };

        this.profilService.buyTicket(ticketBuy).subscribe({
            next: (response: BuyTicketsResponse) => {
                this.paymentIntent = response.paymentIntent;
                this.showPaymentDialog = true;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Tickets bought',
                });
            },
            error: (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur est survenue',
                });
            },
        });
    }
}
