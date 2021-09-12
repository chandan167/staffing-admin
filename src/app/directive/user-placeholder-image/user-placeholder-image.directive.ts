import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appUserPlaceholderImage]',
})
export class UserPlaceholderImageDirective implements OnChanges {

  private LoaderElemant : HTMLElement
  private ParentElemant : HTMLElement
  @Input('placeholder-src') src: string = 'assets/dist/img/avatar5.png';
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.LoaderElemant = this.renderer.createElement('i');
    this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '0');
    if (!this.elRef.nativeElement.src) {
      this.elRef.nativeElement.src = this.src;
    }
    this.buildLoader()
    this.ParentElemant = this.renderer.parentNode(this.elRef.nativeElement);
    this.renderer.appendChild(this.ParentElemant, this.LoaderElemant);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.src = changes.src.currentValue;
      this.elRef.nativeElement.src = this.src;
  }
  @HostListener('error')
  error() {
    this.renderer.setAttribute(this.elRef.nativeElement, 'src', this.src);
  }

  @HostListener('load')
  load() {
    this.renderer.removeChild(this.ParentElemant, this.LoaderElemant)
    this.renderer.removeStyle(this.elRef.nativeElement, 'opacity');
  }

  buildLoader() {
    ['fas', 'fa-sync-alt', 'text-muted', 'absulate-center', 'rotate-center'].map((_class) => {
      this.renderer.addClass(this.LoaderElemant, _class);
    })

  }

}
