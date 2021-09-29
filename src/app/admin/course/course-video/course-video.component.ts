import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {

  spinnerName: string = "CourseVideoComponent";
  constructor() { }

  ngOnInit(): void {
  }

}
