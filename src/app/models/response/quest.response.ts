import { MetaModel } from '../meta.model';
import { QuestModel } from '../quest.model';

export class QuestResponse {
    meta: MetaModel = new MetaModel();
    data: QuestModel[] = [];
}
