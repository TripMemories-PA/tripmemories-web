import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MyFriendsResponse } from '../../models/response/myFriends.response';
import { PostsResponse } from '../../models/response/posts.response';

const URL = environment.apiUrl + '/me/friends';

@Injectable({
    providedIn: 'root',
})
export class FriendsService {
    constructor(private http: HttpClient) {}

    getFriends(page: number = 1, perPage: number = 10) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<MyFriendsResponse>(`${URL}?${params.toString()}`);
    }

    deleteFriend(id: string) {
        return this.http.delete(`${URL}/${id}`);
    }

    getFriendsPost(page: number = 1, perPage: number = 10) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<PostsResponse>(`${URL}/posts?${params.toString()}`);
    }
}
