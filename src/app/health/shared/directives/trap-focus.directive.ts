import { AfterViewInit, Directive, ElementRef } from '@angular/core';

type FocusableElement =
  | HTMLButtonElement
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement;

@Directive({
  selector: '[appTrapFocus]',
})
export class TrapFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement);
  }

  private trapFocus(element: HTMLElement) {
    const focusableElements: NodeListOf<FocusableElement> = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
        'input[type="radio"], input[type="checkbox"], select'
    );
    const focusableEls = Array.from(focusableElements).filter(el => !el.disabled);
    const firstFocusableEl: FocusableElement = focusableEls[0];
    const lastFocusableEl: FocusableElement = focusableEls[focusableEls.length - 1];
    firstFocusableEl.focus();

    element.addEventListener('keydown', function (event: KeyboardEvent) {
      const isTabPressed = event.key === 'Tab';
      if (!isTabPressed) return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          event.preventDefault();
        }
      }
    });
  }
}
