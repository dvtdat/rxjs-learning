import { Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appSetSliderOffset]',
})
export class SetSliderOffsetDirective {
  appSetSliderOffset = input(0);

  constructor() {
    effect(() => {
      document.documentElement.style.setProperty(
        '--slider-offset',
        `${this.appSetSliderOffset()}px`,
      );
    });
  }
}
