import { Component } from '@angular/core';

import { LoadingDirective } from '../../../directives/loading.directive';

@Component({
  selector: 'app-spinner',
  hostDirectives: [LoadingDirective],
  imports: [],
  template: `<i class="icon-loading-02"></i>`,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
    }
  `,
})
export class SpinnerComponent {}
