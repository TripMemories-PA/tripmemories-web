import { Injectable } from '@angular/core';
import { CommentPostRequest } from '../../models/request/commentPost.request';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL = environment.apiUrl + '/comments';

@Injectable({
    providedIn: 'root',
})
export class CommentsService {
    constructor(private http: HttpClient) {}

    storePostComments(comment: CommentPostRequest) {
        return this.http.post(`${URL}`, comment);
    }

    deletePostComment(id: number | string) {
        return this.http.delete(`${URL}/${id}`);
    }

    likeComment(id: number | string) {
        return this.http.post(`${URL}/${id}/like`, {});
    }

    dislikeComment(id: number | string) {
        return this.http.delete(`${URL}/${id}/like`);
    }
}
