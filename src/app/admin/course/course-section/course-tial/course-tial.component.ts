import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseSction, CourseSectionService } from 'src/app/service/course_section/course-section.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-course-tial',
  templateUrl: './course-tial.component.html',
  styleUrls: ['./course-tial.component.scss']
})
export class CourseTialComponent implements OnInit, OnDestroy {

  spinnerName: string = '';
  sub: SubSink = new SubSink();

  editable: boolean = false
  section_name: string = '';


  @Input('section') section: CourseSction | null = null;


  constructor(private courseSectionService: CourseSectionService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.section_name = this.section?.section_name ?? '';
    this.spinnerName = `CourseTialComponent${this.section?.id}` ?? 'CourseTialComponent';
  }

  getClass():string {
    if (this.section?.status == 'publish') {
      return 'bg-danger';
    }
    return 'bg-success';
  }

  getStatus() {
    if (this.section?.status == 'publish') {
      return 'Unpublish';
    }
    return 'Publish';
  }

  getStatusColor() {
    if (this.section?.status == 'publish') {
      return 'text-danger';
    }
    return 'text-success';
  }

  deleteSection() {
    this.showSpinner()
    this.sub.sink = this.courseSectionService.deleteCourseSection(Number(this.section?.id)).subscribe(
      () => this.hideSpinner(),
      () => this.hideSpinner()
    )
  }

  changeStatus() {
    this.showSpinner()
    this.sub.sink = this.courseSectionService.changeCourseSectionStatus(Number(this.section?.id)).subscribe(
      () => this.hideSpinner(),
      () => this.hideSpinner()
    );
  }

  update() {
    this.section_name = this.section_name.trim();

    if (this.section_name && this.section_name !== this.section?.section_name) {
      this.showSpinner();
      this.sub.sink = this.courseSectionService.updateCourseSection(Number(this.section?.id), this.section_name).subscribe(
        () => this.hideSpinner(),
        () => this.hideSpinner()
      );
    }
    this.editable = !this.editable;
  }

  makeEditable() {
    this.section_name = this.section?.section_name ?? '';
    this.editable = !this.editable;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showSpinner() {
    this.spinner.show(this.spinnerName)
  }

  hideSpinner() {
    this.spinner.hide(this.spinnerName)
  }
}
