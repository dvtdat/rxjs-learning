import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import {
  ElementDirective,
  hostElementDirective,
} from '../../../directives/element.directive';
// eslint-disable-next-line import/no-cycle
import { SelectComponent } from '../select/select.component';

export type FormWidth = 'standard' | 'full';
export type FormShape = 'pill' | 'rounded-square' | 'square';
export type FormSelectMode = 'single' | 'multiple';

@Component({
  selector: 'app-form-field, form-field',
  hostDirectives: [hostElementDirective],
  imports: [CdkOverlayOrigin],
  styleUrl: './form-field.component.scss',
  standalone: true,
  template: `
    <div
      class="{{ formContainerClass() }}"
      #formContainer
      cdkOverlayOrigin
      (click)="onClickToggleDropdown()"
    >
      <ng-content></ng-content>
    </div>

    <div class="{{ hintContainerClass() }}">
      <ng-content select="p"></ng-content>
    </div>
  `,
})
export class FormFieldComponent {
  control = contentChild(NgControl);
  select = contentChild(SelectComponent);
  readonly overlayOrigin = viewChild(CdkOverlayOrigin);
  element = inject(ElementDirective, {
    self: true,
  });

  formContainer = viewChild('formContainer', {
    read: ElementRef,
  });

  formContainerWidth = computed(
    () => (this.formContainer()?.nativeElement as HTMLElement).offsetWidth,
  );

  width = input<FormWidth>('standard');
  shape = input<FormShape>('rounded-square');

  selectMode = input<FormSelectMode>('single');
  selectFilter = input(false);

  errors = toSignal(
    toObservable(this.control).pipe(
      switchMap(c =>
        c?.control
          ? c.control.statusChanges.pipe(
              startWith(null),
              map(() => c.control?.errors && c.control?.touched),
            )
          : of(null),
      ),
    ),
  );

  disabled = toSignal(
    toObservable(this.control).pipe(
      switchMap(c =>
        c?.control
          ? c.control.statusChanges.pipe(
              startWith(undefined),
              map(() => c.control?.disabled),
            )
          : of(null),
      ),
    ),
  );

  isValid = computed(() => !this.errors());
  isDisabled = computed(() => this.disabled());
  toggleDropdown = signal(false);

  formContainerClass = computed(() => [
    'form-container',
    this.element.size(),
    this.element.variant(),
    this.element.theme(),
    this.width(),
    this.shape(),
    !this.isValid() ? 'invalid' : '',
    this.isDisabled() ? 'disabled' : '',
    this.toggleDropdown() && this.select() ? 'select-focus' : '',
  ]);

  hintContainerClass = computed(() => [
    'hint-container',
    this.element.size(),
    this.element.variant(),
    this.element.theme(),
    !this.isValid() ? 'invalid' : '',
    this.isDisabled() ? 'disabled' : '',
  ]);

  onClickToggleDropdown() {
    if (!this.disabled()) this.toggleDropdown.set(!this.toggleDropdown());
  }
}
