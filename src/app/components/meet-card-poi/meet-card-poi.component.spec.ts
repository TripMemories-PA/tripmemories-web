import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetCardPoiComponent } from './meet-card-poi.component';
import { RouterModule } from '@angular/router';

describe('MeetCardPoiComponent', () => {
    let component: MeetCardPoiComponent;
    let fixture: ComponentFixture<MeetCardPoiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeetCardPoiComponent, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(MeetCardPoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
