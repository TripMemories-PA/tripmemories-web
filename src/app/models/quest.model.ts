import { IFileImage } from './interface/FileImage';

export class QuestModel {
    id: number;
    title: string;
    imageId: number;
    poiId: number;
    createdAt: string;
    updatedAt: string;
    image: IFileImage;
    done: boolean;

    constructor(
        id: number,
        title: string,
        imageId: number,
        poiId: number,
        createdAt: string,
        updatedAt: string,
        image: IFileImage,
        done: boolean,
    ) {
        this.id = id;
        this.title = title;
        this.imageId = imageId;
        this.poiId = poiId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
        this.done = done;
    }
}
