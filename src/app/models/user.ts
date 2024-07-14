import { IFileImage } from './interface/FileImage';
import { IUserType } from './interface/IUserType';

export class User {
    id?: string;
    poiId?: string | number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    access_token?: string;
    avatar?: IFileImage;
    banner?: IFileImage;
    friends?: any[];
    isFriend?: boolean;
    hasReceivedFriendRequest?: boolean;
    hasSentFriendRequest?: boolean;
    poisCount?: number = 0;
    userTypeId?: number;
    userType?: IUserType;
    score?: number;
    hasPaid?: boolean = false;
}

export class UserRegister {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}
