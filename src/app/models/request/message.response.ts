import { MetaModel } from '../meta.model';
import { MessageModel } from '../../message.model';

export class MessageResponse {
    meta: MetaModel = new MetaModel();
    data: MessageModel[] = [];
}
