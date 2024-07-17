import { Injectable } from '@angular/core';
import { CommentPostRequest } from '../../models/request/commentPost.request';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentsResponse } from '../../models/response/comments.response';

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

    reportComment(id: number | string) {
        return this.http.post(`${URL}/${id}/report`, {});
    }

    getComments(page: string, perPage: string) {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<CommentsResponse>(`${URL}?${params.toString()}`);
    }
}
