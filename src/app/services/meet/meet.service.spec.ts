import { TestBed } from '@angular/core/testing';

import { MeetService } from './meet.service';
import { HttpClientModule } from '@angular/common/http';

describe('MeetService', () => {
    let service: MeetService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(MeetService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
