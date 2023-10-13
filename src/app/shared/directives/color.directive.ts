import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit{

  @Input({ alias: 'appColor', required: true })  
  color: string = '';

  private elementRef = inject(ElementRef)

  ngOnInit() {
    this.elementRef.nativeElement.style.color = this.color;
} 

}
