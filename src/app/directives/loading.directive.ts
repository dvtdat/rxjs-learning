import { Directive } from '@angular/core';

@Directive({
  selector: '[appLoading]',
  host: {
    class: 'loading',
  },
})
export class LoadingDirective {}
