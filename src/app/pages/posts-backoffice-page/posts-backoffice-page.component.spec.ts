import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBackofficePageComponent } from './posts-backoffice-page.component';

describe('PostsBackofficePageComponent', () => {
  let component: PostsBackofficePageComponent;
  let fixture: ComponentFixture<PostsBackofficePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsBackofficePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsBackofficePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
