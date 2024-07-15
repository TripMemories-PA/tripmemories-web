import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchUsersResponse } from '../../models/response/searchUsers.response';
import { NO_AUTH } from '../request.interceptor';
import { User } from '../../models/user';
import { MyFriendsResponse } from '../../models/response/myFriends.response';
import { PostsResponse } from '../../models/response/posts.response';
import { CreateUserRequest } from '../../models/request/createUser.request';

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

    search(search: string, perPage: number = 10, page: number = 1, userTypeId?: number) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        params.append('search', search);
        if (userTypeId) {
            params.append('userTypeId', userTypeId.toString());
        }
        return this.http.get<SearchUsersResponse>(`${URL}?${params.toString()}`);
    }

    create(payload: CreateUserRequest) {
        return this.http.post<User>(URL, payload);
    }

    update(id: number, email: string) {
        return this.http.put<User>(`${URL}/${id}`, { email });
    }

    updatePassword(id: number, password: string) {
        return this.http.put<User>(`${URL}/${id}/password`, { password });
    }
}
