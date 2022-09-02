import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[NumberOnly]'
})
export class StrictNumberOnlyDirective {

  private regex: RegExp = new RegExp('^[0-9]*$');

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown',['$event'])onKeyDown(event: KeyboardEvent) {
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    if(inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }
    return;
  }

  @HostListener('paste',['$event']) onPaste(event) {
    return;
  }
}
