import { User } from './user';

export class CommentModel {
    id: number;
    postId: number;
    createdById: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    likesCount: number;
    isLiked: boolean;
    isReported: boolean;

    constructor(
        id: number,
        postId: number,
        createdById: number,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        createdBy: User,
        likesCount: number,
        isLiked: boolean,
        isReported: boolean,
    ) {
        this.id = id;
        this.postId = postId;
        this.createdById = createdById;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.likesCount = likesCount;
        this.isLiked = isLiked;
        this.isReported = isReported;
    }
}
