import { IFileImage } from './interface/FileImage';
import { AnswerModel } from '../answer.model';

export class QuestionModel {
    id: number;
    question: string;
    imageId: number;
    poiId: number;
    createdAt: Date;
    updatedAt: Date;
    image: IFileImage;
    answers: AnswerModel[];

    constructor(
        id: number,
        question: string,
        imageId: number,
        poiId: number,
        createdAt: Date,
        updatedAt: Date,
        image: IFileImage,
        answers: AnswerModel[],
    ) {
        this.id = id;
        this.question = question;
        this.imageId = imageId;
        this.poiId = poiId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
        this.answers = answers;
    }
}
