import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImgPre]'
})
export class ImgPreDirective implements AfterViewInit {

  @Input('element') element : any = null
  constructor(private el: ElementRef) {
  }
  ngAfterViewInit(): void {
    this.element?.addEventListener('change', (event: any) => {
      const [file] = event.target?.files
      if (file) {
        this.el.nativeElement.src = URL.createObjectURL(file);
      } else {
        this.el.nativeElement.src = "";
      }
    })
  }

}
