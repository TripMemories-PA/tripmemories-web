import { User } from '../user';
import { MetaModel } from '../meta.model';

export class SearchUsersResponse {
    data: User[] = [];
    meta: MetaModel = new MetaModel();
}
