import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeSidenavComponent } from './backoffice-sidenav.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackofficeSidenavComponent', () => {
    let component: BackofficeSidenavComponent;
    let fixture: ComponentFixture<BackofficeSidenavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackofficeSidenavComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(BackofficeSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
