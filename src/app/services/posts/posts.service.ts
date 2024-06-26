import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { PostsResponse } from '../../models/response/posts.response';
import { PostModel } from '../../models/post.model';
import { IFileImage } from '../../models/interface/FileImage';
import { PostCreationModel } from '../../models/request/post.model';

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

    createPost(post: PostCreationModel) {
        return this.http.post(`${URL}`, post);
    }

    deletePost(id: number) {
        return this.http.delete(`${URL}/${id}`);
    }

    sendImagePost(data: FormData) {
        return this.http.post<IFileImage>(`${URL}/image`, data);
    }

    likePost(id: number) {
        return this.http.post(`${URL}/${id}/like`, {});
    }

    deleteLikePost(id: number) {
        return this.http.delete(`${URL}/${id}/like`, {});
    }
}
