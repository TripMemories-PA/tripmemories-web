import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeSidenavComponent } from './backoffice-sidenav.component';

describe('BackofficeSidenavComponent', () => {
    let component: BackofficeSidenavComponent;
    let fixture: ComponentFixture<BackofficeSidenavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackofficeSidenavComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BackofficeSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
