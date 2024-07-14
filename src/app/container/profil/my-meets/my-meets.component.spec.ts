import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetsComponent } from './my-meets.component';

describe('MyMeetsComponent', () => {
    let component: MyMeetsComponent;
    let fixture: ComponentFixture<MyMeetsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyMeetsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyMeetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
