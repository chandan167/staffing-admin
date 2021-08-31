import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInfiiniteScroll]'
})
export class InfiiniteScrollDirective {

  @Input('distance') distance: number = 1;
  @Output() callBack = new EventEmitter<undefined>();

  constructor() { }

  @HostListener('scroll', ['$event'])
  scroll(event: any) {
    const total_scroll = event.target.clientHeight + event.target.scrollTop;
    const totle_height =  event.target.scrollHeight
    if (totle_height  <= total_scroll) {
      this.callBack.emit();
    }
  }


}
