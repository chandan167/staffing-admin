import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {

  sub: SubSink = new SubSink();
  private course_id: number = 0;
  private section_id: number = 0;
  spinnerName: string = "CourseVideoComponent";
  constructor(private router :Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.sink = this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.section_id = Number(param.get('section_id'))
      this.course_id = Number(param.get('course_id'))
    })
  }

  navigate() {
    this.router.navigate([`/course/${this.course_id}/section/${this.section_id}/edit`]);
  }

}
