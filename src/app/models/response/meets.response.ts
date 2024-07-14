import { MeetModel } from '../meet.model';
import { MetaModel } from '../meta.model';

export class MeetsResponse {
    data: MeetModel[] = [];
    meta: MetaModel = new MetaModel();
}
