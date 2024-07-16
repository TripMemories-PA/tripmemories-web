import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficePageComponent } from './backoffice-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackofficePageComponent', () => {
    let component: BackofficePageComponent;
    let fixture: ComponentFixture<BackofficePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackofficePageComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(BackofficePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
