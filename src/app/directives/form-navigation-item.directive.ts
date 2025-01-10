import {
  computed,
  Directive,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { startWith } from 'rxjs';

import {
  NAVIGATION_ITEM,
  NavigationItem,
} from '../components/atoms/navigation/navigation.component';

@Directive({
  selector: '[appFormNavigationItem]',
  providers: [
    {
      provide: NAVIGATION_ITEM,
      useExisting: FormNavigationItemDirective,
      multi: true,
    },
  ],
  host: {
    '(click)': 'setValue(value())',
    '[class.selected]': 'active()',
  },
})
export class FormNavigationItemDirective implements NavigationItem, OnInit {
  value = input('');
  selectedValue = signal('');
  active = computed(() => this.selectedValue() === this.value());
  active$ = toObservable(this.active);

  private formControl = inject(NgControl);

  ngOnInit(): void {
    if (this.formControl.valueChanges) {
      this.formControl.valueChanges
        .pipe(startWith(this.formControl.value))
        .subscribe(value => {
          this.selectedValue.set(value as string);
        });
    }
  }

  setValue(value: string) {
    this.formControl.control?.setValue(value);
  }
}
