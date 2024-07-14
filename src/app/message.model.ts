import { User } from './models/user';

export class MessageModel {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    senderId: number;
    sender: User;

    constructor(
        id: number,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        senderId: number,
        sender: User,
    ) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.senderId = senderId;
        this.sender = sender;
    }
}
