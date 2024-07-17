import { User } from './user';
import { IFileImage } from './interface/FileImage';
import { PoiModel } from './Poi.model';

export class PostModel {
    id?: number;
    createdById?: number;
    poiId?: number;
    content?: string;
    title?: string;
    note?: string;
    imageId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    likesCount?: number;
    commentsCount?: number;
    isLiked?: boolean;
    image?: IFileImage;
    createdBy?: User;
    poi?: PoiModel;
    isReported?: boolean;
}
