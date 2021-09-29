import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSectionComponent } from './course-section.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';
import { CourseTialComponent } from './course-tial/course-tial.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    CourseSectionComponent,
    CourseTialComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class CourseSectionModule { }
