import { MeetModel } from '../../meet.model';
import { MetaModel } from '../meta.model';

export class MeetsResponse {
    meets: MeetModel[] = [];
    meta: MetaModel = new MetaModel();
}
