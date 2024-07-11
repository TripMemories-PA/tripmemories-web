import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NO_AUTH } from '../request.interceptor';
import { IFileImage } from '../../models/interface/FileImage';
import { IValidateAnswer } from '../../models/interface/IValidateAnswer';
import { QuestionResponse } from '../../models/response/question.response';

const URL = environment.apiUrl + '/questions';
const httpOptions = {
    context: new HttpContext().set(NO_AUTH, true),
};
@Injectable({
    providedIn: 'root',
})
export class QuizzService {
    constructor(private http: HttpClient) {}

    getQuestions(page: string = '1', perPage: string = '10') {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('perPage', perPage);
        return this.http.get<QuestionResponse>(`${URL}?${params.toString()}`, httpOptions);
    }

    storeQuestion(question: any) {
        return this.http.post(`${URL}`, question);
    }

    validateAnswerQuestion(id: string, answer: string) {
        return this.http.post<IValidateAnswer>(`${URL}/${id}/answers/${answer}`, {});
    }

    storeImageQuestion(image: FormData) {
        return this.http.post<IFileImage>(`${URL}/image`, image);
    }

    updateQuestion(id: string, question: any) {
        return this.http.put(`${URL}/${id}`, question);
    }

    deleteQuestion(id: string) {
        return this.http.delete(`${URL}/${id}`);
    }
}
