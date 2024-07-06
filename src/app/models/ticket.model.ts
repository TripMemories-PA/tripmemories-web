import { IFileImage } from './interface/FileImage';
import { PoiModel } from './Poi.model';

export class TicketModel {
    id: number;
    poiId: number;
    poi: PoiModel;
    price: number;
    nbrPeople: number;
    quantity: number;
    title: string;
    description: string;
    groupeSize: number;
    createdAt: string;
    updatedAt: string;
    image: IFileImage;

    constructor(
        id: number,
        poiId: number,
        poi: PoiModel,
        price: number,
        nbrPeople: number,
        quantity: number,
        title: string,
        description: string,
        groupeSize: number,
        createdAt: string,
        updatedAt: string,
        image: IFileImage,
    ) {
        this.id = id;
        this.poiId = poiId;
        this.poi = poi;
        this.price = price;
        this.nbrPeople = nbrPeople;
        this.quantity = quantity;
        this.title = title;
        this.description = description;
        this.groupeSize = groupeSize;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
    }
}
