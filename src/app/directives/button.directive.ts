import {
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { ElementDirective, hostElementDirective } from './element.directive';
import { LoadingDirective } from './loading.directive';

export type ButtonWidth = 'fit' | 'full';
export type ButtonShape = 'round' | 'pill' | 'rounded-square' | 'square';

@Directive({
  selector: 'button',
  hostDirectives: [hostElementDirective],
  host: {
    '[disabled]': 'isLoading()',
    '[class]': 'buttonClass()',
  },
})
export class ButtonDirective {
  element = inject(ElementDirective, {
    self: true,
  });

  shape = input<ButtonShape>('rounded-square');
  width = input<ButtonWidth>('fit');

  loading = contentChild(LoadingDirective);

  isLoading = computed(() => this.loading());

  buttonClass = computed(() =>
    [
      'button',
      this.element.size(),
      this.element.variant(),
      this.element.theme(),
      this.shape(),
      this.width(),
      this.isLoading() ? 'disabled' : '',
    ].join(' '),
  );

  constructor(readonly el: ElementRef) {}
}
