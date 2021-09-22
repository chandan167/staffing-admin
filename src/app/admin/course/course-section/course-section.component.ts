import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseSction, CourseSectionService } from 'src/app/service/course_section/course-section.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {
  spinnerName: string = 'CourseSectionComponent';
  sections$: Observable<CourseSction[]> = this.courseSectionService.store$;
  course_id: number = 0;
  sub: SubSink = new SubSink();
  section_name: string = '';

  @ViewChild('sectionNameInput') sectionNameInput: ElementRef|any
  constructor(
    private spinner: NgxSpinnerService,
    private courseSectionService: CourseSectionService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCourseSectionList();
  }

  onRefresh() {

  }

  getSearchValue() {

  }

  searchCourse(value: any) {

  }


  getCourseSectionList() {
    this.spinner.show(this.spinnerName)
    this.sub.sink = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.course_id = Number(params.get('id'))
        return this.courseSectionService.getSectionList(this.course_id)
      })).subscribe(() => {
        this.spinner.hide(this.spinnerName)
      }, () => {
        this.spinner.hide(this.spinnerName)
      });
  }

  addCourseSection() {
    this.section_name = this.section_name.trim();
    if (!this.section_name.length) {
      return;
    }
    this.spinner.show(this.spinnerName)
    this.sub.sink = this.courseSectionService.addCourseSection({
      course_id: this.course_id,
      section_name: this.section_name
    }).subscribe(
      () => {
        this.spinner.hide(this.spinnerName);
        this.section_name = '';
      },
      () => this.spinner.hide(this.spinnerName)
    )
  }

}
