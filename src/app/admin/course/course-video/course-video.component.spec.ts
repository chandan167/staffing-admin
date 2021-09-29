import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVideoComponent } from './course-video.component';

describe('CourseVideoComponent', () => {
  let component: CourseVideoComponent;
  let fixture: ComponentFixture<CourseVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
