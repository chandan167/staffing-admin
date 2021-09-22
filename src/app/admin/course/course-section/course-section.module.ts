import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSectionComponent } from './course-section.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CourseSectionComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule
  ]
})
export class CourseSectionModule { }
