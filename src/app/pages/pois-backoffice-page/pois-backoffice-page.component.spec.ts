import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoisBackofficePageComponent } from './pois-backoffice-page.component';

describe('PoisBackofficePageComponent', () => {
    let component: PoisBackofficePageComponent;
    let fixture: ComponentFixture<PoisBackofficePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PoisBackofficePageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PoisBackofficePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
