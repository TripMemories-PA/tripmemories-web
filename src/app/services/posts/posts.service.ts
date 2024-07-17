import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { PostsResponse } from '../../models/response/posts.response';
import { PostModel } from '../../models/post.model';
import { IFileImage } from '../../models/interface/FileImage';
import { PostCreationModel } from '../../models/request/post.model';
import { CommentsResponse } from '../../models/response/comments.response';

const URL = environment.apiUrl + '/posts';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    constructor(private http: HttpClient) {}

    getPosts(perPage?: string, isConnected: boolean = false, page: string = '1') {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage ?? '10');
        return this.http.get<PostsResponse>(
            `${URL}?${params.toString()}`,
            isConnected ? undefined : httpOptions,
        );
    }

    getPost(id: string, isConnected: boolean = false) {
        return this.http.get<PostModel>(`${URL}/${id}`, isConnected ? undefined : httpOptions);
    }

    getPostComments(
        id: string,
        perPage: string = '10',
        page: string = '1',
        isConnected: boolean = false,
    ) {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<CommentsResponse>(
            `${URL}/${id}/comments?${params.toString()}`,
            isConnected ? undefined : httpOptions,
        );
    }

    createPost(post: PostCreationModel) {
        return this.http.post(`${URL}`, post);
    }

    deletePost(id: number) {
        return this.http.delete(`${URL}/${id}`);
    }

    reportPost(id: number | string) {
        return this.http.post(`${URL}/${id}/report`, {});
    }

    sendImagePost(data: FormData) {
        return this.http.post<IFileImage>(`${URL}/image`, data);
    }

    likePost(id: number | string) {
        return this.http.post(`${URL}/${id}/like`, {});
    }

    deleteLikePost(id: number | string) {
        return this.http.delete(`${URL}/${id}/like`, {});
    }
}
