import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketCardComponent } from './my-ticket-card.component';

describe('MyTicketCardComponent', () => {
    let component: MyTicketCardComponent;
    let fixture: ComponentFixture<MyTicketCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyTicketCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyTicketCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
