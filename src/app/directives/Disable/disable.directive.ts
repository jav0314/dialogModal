import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appDisable]',
  standalone: true,
})
export class disableInputDirective {
  @Input('appDisable') targetControl!: FormControl;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue && inputValue.trim() !== '') {
      this.targetControl.disable();
    } else {
      this.targetControl.enable();
    }
  }
}
