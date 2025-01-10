import { Directive, ElementRef, input } from '@angular/core';

import { Size } from '../models/size';
import { Theme } from '../models/theme';
import { Variant } from '../models/variant';

@Directive({
  selector: '[appElement]',
})
export class ElementDirective {
  size = input<Size>('medium');
  theme = input<Theme>('primary');
  variant = input<Variant>('contained');
  constructor(readonly element: ElementRef) {}
}

export const hostElementDirective = {
  directive: ElementDirective,
  inputs: ['size', 'theme', 'variant'],
};
