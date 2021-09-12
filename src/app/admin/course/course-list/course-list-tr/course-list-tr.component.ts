import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course, CourseService, CourseStatus } from 'src/app/service/course/course.service';

@Component({
  selector: 'tr[app-course-list-tr]',
  templateUrl: './course-list-tr.component.html',
  styleUrls: ['./course-list-tr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListTrComponent implements OnInit {

  courseStatus :CourseStatus = CourseService.courseStatus
  @Input('course') course: Course|any;
  @Output('status') statusEvent = new EventEmitter();
  @Output('delete') deleteEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
  }

  changeStatus() {
    this.statusEvent.emit(this.course.id);
  }

  deleteCourse() {
    this.deleteEvent.emit(this.course.id);
  }

  get discountPrice() {
    return this.course.price - ((this.course.price /100) * this.course.discount)
  }

}
