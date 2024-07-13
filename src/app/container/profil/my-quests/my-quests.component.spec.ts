import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestsComponent } from './my-quests.component';

describe('MyQuestsComponent', () => {
    let component: MyQuestsComponent;
    let fixture: ComponentFixture<MyQuestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyQuestsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyQuestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
