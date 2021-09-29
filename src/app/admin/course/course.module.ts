import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagePickerModule } from 'src/app/image-picker';
import { NgxVideoListPlayerModule } from 'ngx-video-list-player';

import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ShareModule } from 'src/app/share/share.module';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CourseListTrComponent } from './course-list/course-list-tr/course-list-tr.component';
import { CourseSectionModule } from './course-section/course-section.module';
import { CourseVideoComponent } from './course-video/course-video.component';
import { VideoComponent } from './course-video/video/video.component';



@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    CourseListComponent,
    CourseListTrComponent,
    CourseVideoComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DirectiveModule,
    SweetAlert2Module,
    ImagePickerModule,
    CourseSectionModule,
    NgxVideoListPlayerModule
  ]
})
export class CourseModule { }
