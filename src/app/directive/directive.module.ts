import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiiniteScrollDirective } from './infiniteScroll/infiinite-scroll.directive';
import { UserPlaceholderImageDirective } from './user-placeholder-image/user-placeholder-image.directive';
import { PlaceholderImageDirective } from './placeholder-image/placeholder-image.directive';



@NgModule({
  declarations: [
    InfiiniteScrollDirective,
    UserPlaceholderImageDirective,
    PlaceholderImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InfiiniteScrollDirective,
    UserPlaceholderImageDirective
  ]
})
export class DirectiveModule { }
