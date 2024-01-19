import { Directive, ElementRef, HostListener, OnChanges } from '@angular/core';

@Directive({
     selector: '[appTextOnly]',
})
export class TextOnlyDirective implements OnChanges {
     constructor(private el: ElementRef<HTMLInputElement>) {}

     @HostListener('input', ['$event'])
     public ngOnChanges(): void {
          const initialValue: string = this.el.nativeElement.value;
          this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z0-9-.,]*/g, '');
     }
}
