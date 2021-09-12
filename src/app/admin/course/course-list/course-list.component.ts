import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from 'src/app/interface/base.interface';
import { Course, CourseList, CourseService } from 'src/app/service/course/course.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses$: BehaviorSubject<Course[]>
  pagination$: BehaviorSubject<Pagination | any>

  private sub: SubSink;

  spinnerName:string ='CourseListComponent'
  constructor(private courseService: CourseService, private spinner: NgxSpinnerService) {
    this.courses$ = new BehaviorSubject<Course[]>([])
    this.pagination$ = new BehaviorSubject<Pagination | any>({ });
    this.sub = new SubSink();
   }


   ngOnInit(): void {
    this.sub.sink = this.courseService.store$.subscribe((data: CourseList) => {
      this.courses$.next(data.data);
      this.pagination$.next(data.pagination)
    })
    this.sub.sink = this.courseService.isloading().subscribe(data => {
      if (data) {
        this.spinner.show(this.spinnerName)
      } else {
        this.spinner.hide(this.spinnerName)
      }
    })
   }


  changeStatus(id: number) {
    this.sub.sink = this.courseService.changeStatus(id).subscribe()
  }

  deleteCourse(id: number) {
    this.sub.sink = this.courseService.delete(id).subscribe()
  }


   searchCourse(value:any) {
    this.courseService.search(value)
  }

  nextPage() {
    this.courseService.next_page()
  }

  courseList(index:number, course:Course) {
    return course.id;
  }

  onRefresh() {
    this.courseService.refresh();
  }

  getSearchValue() {
    return this.courseService.getSearchValue();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
