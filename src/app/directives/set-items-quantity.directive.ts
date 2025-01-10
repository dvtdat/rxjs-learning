import { Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appSetItemsQuantity]',
})
export class SetItemsQuantityDirective {
  appSetItemsQuantity = input(0);

  constructor() {
    effect(() => {
      document.documentElement.style.setProperty(
        '--items-length',
        this.appSetItemsQuantity().toString(),
      );
    });
  }
}
