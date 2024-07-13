import { TestBed } from '@angular/core/testing';

import { QuestService } from './quest.service';
import { HttpClientModule } from '@angular/common/http';

describe('QuestService', () => {
    let service: QuestService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(QuestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
