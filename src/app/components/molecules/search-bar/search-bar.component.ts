import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { ButtonDirective } from '../../../directives/button.directive';
import { FormFieldComponent } from '../../atoms/form-field/form-field.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonDirective,
    SpinnerComponent,
  ],
  template: ` <form
    class="search-bar"
    [formGroup]="form"
    (ngSubmit)="onSubmit()"
  >
    <p class="font-bold">Search Bar</p>
    <div>
      <form-field
        [variant]="'outlined'"
        [size]="'small'"
        [theme]="'primary'"
        [width]="'standard'"
        [shape]="'pill'"
      >
        <input
          type="text"
          placeholder="Enter Keyword"
          formControlName="content"
        />
        <p class="error">Missing Keyword</p>
      </form-field>

      <button
        [variant]="'contained'"
        [theme]="'primary'"
        [shape]="'round'"
        [width]="'fit'"
        [size]="'small'"
        type="submit"
      >
        @if (loading()) {
          <app-spinner />
        }
        <i class="icon-search-lg"></i>
      </button>
    </div>
  </form>`,
  styles: `
    .search-bar {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      width: max-content;

      > div {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
      }
    }
  `,
})
export class SearchBarComponent {
  fb = inject(FormBuilder);
  form = this.fb.group({
    content: [{ value: '', disabled: false }, [Validators.required]],
  });

  loading = signal(false);

  onSubmit() {
    console.log(this.form);
    this.form.controls.content.markAsTouched();
    this.form.controls.content.updateValueAndValidity();
  }
}
