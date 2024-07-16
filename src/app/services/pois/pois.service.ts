import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { PoiModel } from '../../models/Poi.model';
import { PoisPostResponse, PoisSearchResponse } from '../../models/response/pois.response';
import { TicketModel } from '../../models/ticket.model';
import { QuestionResponse } from '../../models/response/question.response';
import { MeetsResponse } from '../../models/response/meets.response';

const URL = environment.apiUrl + '/pois';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};
@Injectable({
    providedIn: 'root',
})
export class PoisService {
    constructor(private http: HttpClient) {}

    getPOIs(
        page: string = '1',
        perPage: string = '10',
        swLat?: string,
        swLng?: string,
        radius?: string,
        search?: string,
    ) {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        if (search) {
            params.append('search', search);
        }
        if (swLat) {
            params.append('lat', swLat.toString());
        }
        if (swLng) {
            params.append('lng', swLng.toString());
        }
        if (radius) {
            params.append('radius', radius.toString());
        }

        return this.http.get<PoisSearchResponse>(`${URL}?${params.toString()}`, httpOptions);
    }

    getPOI(id: string) {
        return this.http.get<PoiModel>(`${URL}/${id}`, httpOptions);
    }

    getPoiQuestions(
        id: string,
        page: string = '1',
        perPage: string = '10',
        isConnected: boolean = false,
    ) {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<QuestionResponse>(
            `${URL}/${id}/questions?${params.toString()}`,
            isConnected ? undefined : httpOptions,
        );
    }

    getPoiPosts(id: string, perPage: string = '10', page = '1') {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<PoisPostResponse>(
            `${URL}/${id}/posts?${params.toString()}`,
            httpOptions,
        );
    }

    getPoiMeets(id: string, page = '1', perPage: string = '10') {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<MeetsResponse>(`${URL}/${id}/meets?${params.toString()}`, httpOptions);
    }

    getPoisTickets(id: string) {
        return this.http.get<TicketModel[]>(`${URL}/${id}/tickets`, httpOptions);
    }

    getPoiSales(id: string, startDate?: string, endDate?: string) {
        const params = new URLSearchParams();
        if (startDate) {
            params.append('startDate', startDate);
        }
        if (endDate) {
            params.append('endDate', endDate);
        }
        return this.http.get(`${URL}/${id}/sales?${params.toString()}`);
    }

    getTypes() {
        return this.http.get(`${URL}/types`);
    }
}
