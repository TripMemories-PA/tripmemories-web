import { User } from './models/user';
import { PoiModel } from './models/Poi.model';
import { TicketModel } from './models/ticket.model';

export class MeetModel {
    id: number;
    title: string;
    description: string;
    size: number;
    date: Date;
    price: number;
    createdBy: number;
    poiId: number;
    createdAt: Date;
    updatedAt: Date;
    createdByUser: User;
    poi: PoiModel;
    ticket: TicketModel;
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
        createdBy: number,
        poiId: number,
        createdAt: Date,
        updatedAt: Date,
        createdByUser: User,
        poi: PoiModel,
        ticket: TicketModel,
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
        this.createdBy = createdBy;
        this.poiId = poiId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdByUser = createdByUser;
        this.poi = poi;
        this.ticket = ticket;
        this.isJoined = isJoined;
        this.canJoin = canJoin;
        this.usersCount = usersCount;
        this.isLocked = isLocked;
    }
}
