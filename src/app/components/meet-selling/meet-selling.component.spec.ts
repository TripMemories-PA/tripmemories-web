import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetSellingComponent } from './meet-selling.component';

describe('MeetSellingComponent', () => {
    let component: MeetSellingComponent;
    let fixture: ComponentFixture<MeetSellingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeetSellingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetSellingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
