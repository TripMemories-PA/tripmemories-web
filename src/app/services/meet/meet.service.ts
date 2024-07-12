import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BuyTicketsResponse } from '../../models/response/buyTickets.response';
import { MeetRequest } from '../../models/request/meet.request';
import { MeetModel } from '../../meet.model';
import { SearchUsersResponse } from '../../models/response/searchUsers.response';

const URL = environment.apiUrl + '/meets';

@Injectable({
    providedIn: 'root',
})
export class MeetService {
    constructor(private http: HttpClient) {}

    createMeet(data: MeetRequest) {
        return this.http.post(`${URL}`, data);
    }

    getMeet(id: string) {
        return this.http.get<MeetModel>(`${URL}/${id}`);
    }

    updateMeet(id: string, data: MeetRequest) {
        return this.http.put(`${URL}/${id}`, data);
    }

    deleteMeet(id: string) {
        return this.http.delete(`${URL}/${id}`);
    }

    joinMeet(id: string) {
        return this.http.post(`${URL}/${id}/join`, {});
    }

    leaveMeet(id: string) {
        return this.http.post(`${URL}/${id}/leave`, {});
    }

    payMeet(id: string) {
        return this.http.post<BuyTicketsResponse>(`${URL}/${id}/pay`, {});
    }

    getUsersMeet(id: string, page: string | number = 1, perPage: number | string = 10) {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('perPage', perPage.toString());
        return this.http.get<SearchUsersResponse>(`${URL}/${id}/users?${params.toString()}`);
    }

    deleteUserMeet(id: string, userId: string) {
        return this.http.delete(`${URL}/${id}/users/${userId}`);
    }
}
