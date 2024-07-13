import { User } from './user';
import { PoiModel } from './Poi.model';
import { TicketModel } from './ticket.model';

export class MeetModel {
    id: number;
    title: string;
    description: string;
    size: number;
    date: Date;
    price: number;
    createdById: number;
    poiId: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    poi: PoiModel;
    ticket: TicketModel | null;
    ticketId: number | null;
    isJoined: boolean;
    canJoin: boolean | null;
    usersCount: number;
    isLocked: boolean;

    constructor(
        id: number,
        title: string,
        description: string,
        size: number,
        date: Date,
        price: number,
        createdById: number,
        poiId: number,
        createdAt: Date,
        updatedAt: Date,
        createdBy: User,
        poi: PoiModel,
        ticket: TicketModel | null,
        ticketId: number | null,
        isJoined: boolean,
        canJoin: boolean | null,
        usersCount: number,
        isLocked: boolean,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.size = size;
        this.date = date;
        this.price = price;
        this.createdById = createdById;
        this.poiId = poiId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.poi = poi;
        this.ticket = ticket;
        this.ticketId = ticketId;
        this.isJoined = isJoined;
        this.canJoin = canJoin;
        this.usersCount = usersCount;
        this.isLocked = isLocked;
    }
}
