import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgpImagePickerModule } from 'ngp-image-picker';



import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ShareModule } from 'src/app/share/share.module';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CourseListTrComponent } from './course-list/course-list-tr/course-list-tr.component';



@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    CourseListComponent,
    CourseListTrComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DirectiveModule,
    SweetAlert2Module,
    NgpImagePickerModule
  ]
})
export class CourseModule { }
