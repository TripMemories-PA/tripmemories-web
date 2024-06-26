import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommentsService', () => {
    let service: CommentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(CommentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
