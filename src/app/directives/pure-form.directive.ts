import { Directive, effect, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: '[appPureForm]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PureFormDirective,
      multi: true,
    },
  ],
})
export class PureFormDirective<T> implements ControlValueAccessor {
  fb = inject(FormBuilder);
  readonly formControl = this.fb.control<T | undefined | null>(undefined);

  private onChange = signal<undefined | ((v: T | undefined | null) => void)>(
    undefined,
  );

  constructor() {
    effect(() => {
      const onChange = this.onChange();
      if (onChange) {
        this.formControl.valueChanges.subscribe(v => {
          onChange(v);
        });
      }
    });
  }

  writeValue(obj: T): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(fn: (v: T | undefined | null) => void): void {
    this.onChange.set(fn);
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    // eslint-disable-next-line sonarjs/no-selector-parameter
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
