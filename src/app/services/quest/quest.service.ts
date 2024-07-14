import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { QuestRequest } from '../../models/request/quest.request';
import { QuestModel } from '../../models/quest.model';
import { QuestImageResponse } from '../../models/response/questImage.response';

const URL = environment.apiUrl + '/quests';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};

@Injectable({
    providedIn: 'root',
})
export class QuestService {
    constructor(private http: HttpClient) {}

    storePicture(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<QuestImageResponse>(URL + '/image', formData);
    }

    createQuest(quest: QuestRequest) {
        return this.http.post(URL, quest);
    }

    getQuest(id: string) {
        return this.http.get<QuestModel>(`${URL}/${id}`);
    }

    updateQuest(id: string, quest: QuestRequest) {
        return this.http.put(`${URL}/${id}`, quest);
    }

    deleteQuest(id: string) {
        return this.http.delete(`${URL}/${id}`);
    }
}
