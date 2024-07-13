import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMissionCardComponent } from './my-mission-card.component';
import { HttpClientModule } from '@angular/common/http';

describe('MyMissionCardComponent', () => {
    let component: MyMissionCardComponent;
    let fixture: ComponentFixture<MyMissionCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyMissionCardComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(MyMissionCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
