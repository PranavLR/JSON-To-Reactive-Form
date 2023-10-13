import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective implements OnInit{

  @Input({ alias : 'appBackgroundColor', required: true }) 
  backgroundColor!: string; 
  private elementRef = inject(ElementRef)

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = this.backgroundColor;
}  

}
