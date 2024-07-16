import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBackofficePageComponent } from './posts-backoffice-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsBackofficePageComponent', () => {
    let component: PostsBackofficePageComponent;
    let fixture: ComponentFixture<PostsBackofficePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PostsBackofficePageComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(PostsBackofficePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
