import { MetaModel } from '../meta.model';
import { QuestionModel } from '../question.model';

export class QuestionResponse {
    data: QuestionModel[] = [];
    meta: MetaModel = new MetaModel();
}
