import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appText]',
  standalone: true,
})
export class TextDirective {
  constructor() {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];

    if (allowedKeys.indexOf(event.key) !== -1) {
      return;
    }

    const isNumber = /^[0-9]$/.test(event.key);
    if (isNumber) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text');
    if (clipboardData && /^\d+$/.test(clipboardData)) {
      event.preventDefault(); // Evitar pegar si no son números
    }
  }
}
