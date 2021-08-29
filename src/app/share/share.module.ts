import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerModule
  ],
})
export class ShareModule { }
