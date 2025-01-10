import { Component, input } from '@angular/core';

@Component({
  selector: 'app-option',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class OptionComponent {
  value = input('');
  label = input('');
}
