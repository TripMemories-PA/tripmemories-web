import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsBackofficePageComponent } from './comments-backoffice-page.component';

describe('CommentsBackofficePageComponent', () => {
  let component: CommentsBackofficePageComponent;
  let fixture: ComponentFixture<CommentsBackofficePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsBackofficePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsBackofficePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
