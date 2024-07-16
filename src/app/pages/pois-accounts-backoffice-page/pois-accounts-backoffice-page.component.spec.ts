import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoisAccountsBackofficePageComponent } from './pois-accounts-backoffice-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PoisAccountsBackofficePageComponent', () => {
    let component: PoisAccountsBackofficePageComponent;
    let fixture: ComponentFixture<PoisAccountsBackofficePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PoisAccountsBackofficePageComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(PoisAccountsBackofficePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
