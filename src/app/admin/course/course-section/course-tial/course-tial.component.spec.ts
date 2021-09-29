import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTialComponent } from './course-tial.component';

describe('CourseTialComponent', () => {
  let component: CourseTialComponent;
  let fixture: ComponentFixture<CourseTialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
