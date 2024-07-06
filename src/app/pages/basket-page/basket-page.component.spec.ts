import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPageComponent } from './basket-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule, StripeService } from 'ngx-stripe';

describe('BasketPageComponent', () => {
    let component: BasketPageComponent;
    let fixture: ComponentFixture<BasketPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasketPageComponent, HttpClientModule, NgxStripeModule.forRoot('')],
            providers: [StripeService],
        }).compileComponents();

        fixture = TestBed.createComponent(BasketPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
