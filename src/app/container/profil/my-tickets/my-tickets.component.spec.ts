import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketsComponent } from './my-tickets.component';
import { HttpClientModule } from '@angular/common/http';

describe('MyTicketsComponent', () => {
    let component: MyTicketsComponent;
    let fixture: ComponentFixture<MyTicketsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyTicketsComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(MyTicketsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
