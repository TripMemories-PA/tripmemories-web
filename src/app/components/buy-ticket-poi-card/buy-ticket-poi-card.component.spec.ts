import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketPoiCardComponent } from './buy-ticket-poi-card.component';

describe('BuyTicketPoiCardComponent', () => {
    let component: BuyTicketPoiCardComponent;
    let fixture: ComponentFixture<BuyTicketPoiCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BuyTicketPoiCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BuyTicketPoiCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
