import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetPageComponent } from './meet-page.component';

describe('MeetPageComponent', () => {
    let component: MeetPageComponent;
    let fixture: ComponentFixture<MeetPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeetPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
