import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsBackofficePageComponent } from './comments-backoffice-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommentsBackofficePageComponent', () => {
    let component: CommentsBackofficePageComponent;
    let fixture: ComponentFixture<CommentsBackofficePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommentsBackofficePageComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CommentsBackofficePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
