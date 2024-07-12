import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembersMeetComponent } from './list-members-meet.component';

describe('ListMembersMeetComponent', () => {
    let component: ListMembersMeetComponent;
    let fixture: ComponentFixture<ListMembersMeetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListMembersMeetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListMembersMeetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
