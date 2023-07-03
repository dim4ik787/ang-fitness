import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMinimumValue]',
})
export class MinimumValueDirective {
  private _appMinimumValue: number | null = null;

  @HostBinding('style.border') border: string | undefined;

  @Input()
  set appMinimumValue(value: string | number | null) {
    if (typeof value === 'string') value = +value;
    if (typeof value === 'number' && !isNaN(value) && isFinite(value))
      this._appMinimumValue = value;
  }

  get appMinimumValue(): number | null {
    return this._appMinimumValue;
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = +input.value.replace(/\s+/g, '');

    if (typeof this.appMinimumValue === 'number') {
      trimmed = trimmed > this.appMinimumValue ? trimmed : this.appMinimumValue;
    }

    input.value = trimmed.toString();
  }
}
