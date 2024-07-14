import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchUsersResponse } from '../../models/response/searchUsers.response';
import { NO_AUTH } from '../request.interceptor';
import { User } from '../../models/user';
import { MyFriendsResponse } from '../../models/response/myFriends.response';
import { PostsResponse } from '../../models/response/posts.response';
import { IMessageRequest } from '../../models/interface/IMessageRequest';
import { MessageResponse } from '../../models/request/message.response';

const URL = environment.apiUrl + '/users';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

    getUser(id: string | number, isConnected: boolean = false) {
        return this.http.get<User>(`${URL}/${id}`, isConnected ? undefined : httpOptions);
    }

    getUserFriends(
        id: string | number,
        perPage: number = 10,
        page: number = 1,
        isConnected: boolean = false,
    ) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<MyFriendsResponse>(
            `${URL}/${id}/friends?${params.toString()}`,
            isConnected ? undefined : httpOptions,
        );
    }

    getUserPosts(id: string | number, perPage: number = 10, page: number = 1) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<PostsResponse>(`${URL}/${id}/posts?${params.toString()}`);
    }

    getUserRanking(perPage: number = 20, page: number = 1) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        params.append('sortBy', 'score');
        params.append('order', 'desc');
        return this.http.get<SearchUsersResponse>(`${URL}?${params.toString()}`);
    }

    search(search: string) {
        const params = new URLSearchParams();
        params.append('page', '1');
        params.append('perPage', '10');
        params.append('search', search);
        return this.http.get<SearchUsersResponse>(`${URL}?${params.toString()}`);
    }

    storeMessage(id: string, message: IMessageRequest) {
        return this.http.post(`${URL}/${id}/messages`, message);
    }

    getMessages(id: string, page: string | number = 1, perPage: number | string = 10) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<MessageResponse>(`${URL}/${id}/messages?${params.toString()}`);
    }
}
