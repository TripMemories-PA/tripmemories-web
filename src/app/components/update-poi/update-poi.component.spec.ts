import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoiComponent } from './update-poi.component';
import { HttpClientModule } from '@angular/common/http';

describe('UpdatePoiComponent', () => {
    let component: UpdatePoiComponent;
    let fixture: ComponentFixture<UpdatePoiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdatePoiComponent, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdatePoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
