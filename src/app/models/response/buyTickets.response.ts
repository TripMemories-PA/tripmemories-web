export class BuyTicketsResponse {
    paymentIntent: string;

    constructor(paymentIntent: string) {
        this.paymentIntent = paymentIntent;
    }
}
