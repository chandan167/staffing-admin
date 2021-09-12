import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerModule,
    ToastrModule,
    RouterModule,
  ],
})
export class ShareModule { }
