import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiiniteScrollDirective } from './infiniteScroll/infiinite-scroll.directive';



@NgModule({
  declarations: [
    InfiiniteScrollDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InfiiniteScrollDirective
  ]
})
export class DirectiveModule { }
