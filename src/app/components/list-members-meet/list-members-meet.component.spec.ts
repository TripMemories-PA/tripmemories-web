import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembersMeetComponent } from './list-members-meet.component';
import { HttpClientModule } from '@angular/common/http';

describe('ListMembersMeetComponent', () => {
    let component: ListMembersMeetComponent;
    let fixture: ComponentFixture<ListMembersMeetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListMembersMeetComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ListMembersMeetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
