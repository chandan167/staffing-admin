import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../directive/directive.module'



@NgModule({
  declarations: [
    ImagePickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  exports: [
    ImagePickerComponent
  ]
})
export class ImagePickerModule { }
