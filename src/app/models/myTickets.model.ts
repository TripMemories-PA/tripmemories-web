import { TicketModel } from './ticket.model';

export class MyTicketsModel {
    id: number;
    usedAt: any;
    paid: boolean;
    qrCode: string;
    ticketId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    ticket: TicketModel;

    constructor(
        id: number,
        usedAt: any,
        paid: boolean,
        qrCode: string,
        ticketId: number,
        userId: number,
        createdAt: Date,
        updatedAt: Date,
        ticket: TicketModel,
    ) {
        this.id = id;
        this.usedAt = usedAt;
        this.paid = paid;
        this.qrCode = qrCode;
        this.ticketId = ticketId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.ticket = ticket;
    }
}
