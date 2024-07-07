import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule, StripeService } from 'ngx-stripe';

describe('BasketComponent', () => {
    let component: BasketComponent;
    let fixture: ComponentFixture<BasketComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasketComponent, HttpClientModule, NgxStripeModule.forRoot('')],
            providers: [StripeService],
        }).compileComponents();

        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
