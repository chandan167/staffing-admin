import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVideoEditComponent } from './section-video-edit.component';

describe('SectionVideoEditComponent', () => {
  let component: SectionVideoEditComponent;
  let fixture: ComponentFixture<SectionVideoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionVideoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVideoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
