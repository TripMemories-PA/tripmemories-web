import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { PostsResponse } from '../../models/response/posts.response';
import { TicketBuyRequest } from '../../models/request/ticketBuy.request';

const URL = environment.apiUrl + '/me';

@Injectable({
    providedIn: 'root',
})
export class ProfilService {
    constructor(private http: HttpClient) {}

    uploadImage(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(URL + '/avatar', formData);
    }

    uploadBanner(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(URL + '/banner', formData);
    }

    updateMe(user: User) {
        return this.http.put(`${URL}`, user);
    }

    getMe() {
        return this.http.get<User>(`${URL}`);
    }

    getPosts(page: number = 1, perPage: number = 10) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<PostsResponse>(`${URL}/posts?${params.toString()}`);
    }

    getMyTickets() {
        return this.http.get(`${URL}/tickets`);
    }

    deleteMe() {
        return this.http.delete(`${URL}`);
    }

    buyTicket(ticket: TicketBuyRequest) {
        return this.http.post(`${URL}/tickets/buy`, ticket);
    }
}
