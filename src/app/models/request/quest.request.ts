export class QuestRequest {
    title: string;
    imageId: number;
    poiId: number;
    label: string;

    constructor(title: string, imageId: number, poiId: number, label: string) {
        this.title = title;
        this.imageId = imageId;
        this.poiId = poiId;
        this.label = label;
    }
}
