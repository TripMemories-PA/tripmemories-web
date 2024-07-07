import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('TicketService', () => {
    let service: TicketService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([])],
        });
        service = TestBed.inject(TicketService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
