import { Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appSetSliderWidth]',
})
export class SetSliderWidthDirective {
  appSetSliderWidth = input(0);

  constructor() {
    effect(() => {
      document.documentElement.style.setProperty(
        '--slider-width',
        `${this.appSetSliderWidth()}px`,
      );
    });
  }
}
