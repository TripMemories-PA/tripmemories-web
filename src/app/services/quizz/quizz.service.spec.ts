import { TestBed } from '@angular/core/testing';

import { QuizzService } from './quizz.service';
import { HttpClientModule } from '@angular/common/http';

describe('QuizzService', () => {
    let service: QuizzService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(QuizzService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
