import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerModule,
    ToastrModule
  ],
})
export class ShareModule { }
