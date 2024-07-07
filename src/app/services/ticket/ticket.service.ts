import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { TicketModel } from '../../models/ticket.model';
import { CreateTicketRequest } from '../../models/request/createTicket.request';

const URL = environment.apiUrl + '/tickets';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    constructor(private http: HttpClient) {}

    createTicket(payload: CreateTicketRequest) {
        return this.http.post(URL, payload);
    }

    getTicket(id: string) {
        return this.http.get<TicketModel>(`${URL}/${id}`);
    }

    updateTicket(id: string, payload: any) {
        return this.http.put(`${URL}/${id}`, payload);
    }

    deleteTicket(id: string) {
        return this.http.delete(`${URL}/${id}`);
    }
}
