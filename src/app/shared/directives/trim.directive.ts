import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
     selector: '[bldTrim]',
})
export class TrimDirective {
     constructor(private el: ElementRef<HTMLInputElement>) {}

     @HostListener('blur')
     public onBlur(): void {
          if (this.el.nativeElement.value) {
               const textValue = this.el.nativeElement.value;
               this.el.nativeElement.value = textValue.trim();
          }
     }
}
