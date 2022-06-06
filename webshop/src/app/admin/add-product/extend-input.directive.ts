import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[extendInput]'
})
export class ExtendInputDirective {

  constructor(public element: ElementRef) { 
    // console.log(this.element.nativeElement);
    // this.element.nativeElement.style.width = '20%';
  }

  @HostListener('input')
  adjust() {
    // this.element.nativeElement.style.width = '80%';
    const element = this.element.nativeElement;
    element.style.overflow = "hidden";
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + "px";
  }
}
