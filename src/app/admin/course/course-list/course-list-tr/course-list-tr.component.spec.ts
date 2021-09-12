import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListTrComponent } from './course-list-tr.component';

describe('CourseListTrComponent', () => {
  let component: CourseListTrComponent;
  let fixture: ComponentFixture<CourseListTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListTrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
