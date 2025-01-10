import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { FormFieldComponent } from '../../components/atoms/form-field/form-field.component';
import { OptionComponent } from '../../components/atoms/option/option.component';
import { SelectComponent } from '../../components/atoms/select/select.component';
import { SpinnerComponent } from '../../components/atoms/spinner/spinner.component';
import { ButtonDirective } from '../../directives/button.directive';

const userDetails = [
  { src: '', firstName: 'Doan', lastName: 'a' },
  { src: '/avatar/my-avatar.png', firstName: 'a', lastName: 'Dat' },
  { src: '/avatar/my-avatar-X.png', firstName: 'Doan', lastName: 'Dat' },
  { src: '/avatar/my-avatar-2.png', firstName: 'x', lastName: 'Dat' },
  { src: '', firstName: 'Doan', lastName: 'Dat' },
  { src: '/avatar/my-avatar-3.png', firstName: 'Doan', lastName: 'Dat' },
  { src: '/avatar/my-avatar-x.png', firstName: 'Doan', lastName: 'Dat' },
  { src: '/avatar/my-avatar-x.png', firstName: 'Doan', lastName: 'Dat' },
  { src: '/avatar/my-avatar-x.png', firstName: 'Doan', lastName: '' },
];

const options = [
  { value: 'hanoi', label: 'Ha Noi' },
  { value: 'hcmc', label: 'Ho Chi Minh City' },
  { value: 'cantho', label: 'Can Tho' },
  { value: 'haiphong', label: 'Hai Phong' },
  { value: 'danang', label: 'Da Nang' },
  { value: 'nhatrang', label: 'Nha Trang' },
  { value: 'hue', label: 'Hue' },
  { value: 'vungtau', label: 'Vung Tau' },
  { value: 'quynhon', label: 'Quy Nhon' },
  { value: 'buonmathuot', label: 'Buon Ma Thuot' },
  { value: 'dalat', label: 'Da Lat' },
  { value: 'phuquoc', label: 'Phu Quoc' },
  { value: 'donghoi', label: 'Dong Hoi' },
  { value: 'hagiang', label: 'Ha Giang' },
  { value: 'sapa', label: 'Sa Pa' },
  { value: 'bacninh', label: 'Bac Ninh' },
  { value: 'thainguyen', label: 'Thai Nguyen' },
  { value: 'thanhhoa', label: 'Thanh Hoa' },
  { value: 'vinh', label: 'Vinh' },
  { value: 'namdinh', label: 'Nam Dinh' },
];
@Component({
  selector: 'app-demo',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ButtonDirective,
    SpinnerComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    SelectComponent,
    OptionComponent,
  ],
  template: `
    <div class="container">
      <!-- <div class="container-item">
        <app-search-bar></app-search-bar>
      </div> -->

      <div class="container-item">
        <h1 class="font-bold">Form Field (Small)</h1>
        <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
          <form-field
            [variant]="'outlined'"
            [size]="'small'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-user-01" #icon></i>
            <input type="text" placeholder="Name" formControlName="name" />
            <p>Text Input</p>
            <p class="error">Invalid Name</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'small'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-mail-01" #icon></i>
            <input type="email" placeholder="Email" formControlName="email" />
            <p>Email Input</p>
            <p class="error">Invalid Email</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'small'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="false"
          >
            <i class="icon-bar-chart-11" #icon></i>

            <app-select formControlName="option">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'small'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="true"
          >
            <i class="icon-bar-chart-10" #icon></i>

            <app-select formControlName="option3">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select, Filter</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'small'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'multiple'"
          >
            <i class="icon-bar-chart-12" #icon></i>

            <app-select formControlName="option2">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>
            <p>Multiple Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <div></div>

          <button
            [variant]="'contained'"
            [theme]="'primary'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'small'"
            type="submit"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Submit</div>
          </button>

          <button
            [variant]="'outlined'"
            [theme]="'neutral'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'small'"
            type="submit"
            (click)="toggleDisabled()"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Toggle Disabled</div>
          </button>
        </form>
      </div>

      <div class="container-item">
        <h1 class="font-bold">Form Field (Medium)</h1>
        <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
          <form-field
            [variant]="'outlined'"
            [size]="'medium'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-user-01" #icon></i>
            <input type="text" placeholder="Name" formControlName="name" />
            <p>Text Input</p>
            <p class="error">Invalid Name</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'medium'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-mail-01" #icon></i>
            <input type="email" placeholder="Email" formControlName="email" />
            <p>Email Input</p>
            <p class="error">Invalid Email</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'medium'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="false"
          >
            <i class="icon-bar-chart-11" #icon></i>

            <app-select formControlName="option">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'medium'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="true"
          >
            <i class="icon-bar-chart-10" #icon></i>

            <app-select formControlName="option3">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select, Filter</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'medium'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'multiple'"
          >
            <i class="icon-bar-chart-12" #icon></i>

            <app-select formControlName="option2">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>
            <p>Multiple Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <div></div>

          <button
            [variant]="'contained'"
            [theme]="'primary'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'medium'"
            type="submit"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Submit</div>
          </button>

          <button
            [variant]="'outlined'"
            [theme]="'neutral'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'medium'"
            type="submit"
            (click)="toggleDisabled()"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Toggle Disabled</div>
          </button>
        </form>
      </div>

      <div class="container-item">
        <h1 class="font-bold">Form Field (Large)</h1>
        <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
          <form-field
            [variant]="'outlined'"
            [size]="'large'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-user-01" #icon></i>
            <input type="text" placeholder="Name" formControlName="name" />
            <p>Text Input</p>
            <p class="error">Invalid Name</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'large'"
            [theme]="'primary'"
            [width]="'full'"
            [shape]="'rounded-square'"
          >
            <i class="icon-mail-01" #icon></i>
            <input type="email" placeholder="Email" formControlName="email" />
            <p>Email Input</p>
            <p class="error">Invalid Email</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'large'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="false"
          >
            <i class="icon-bar-chart-11" #icon></i>

            <app-select formControlName="option">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'large'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'single'"
            [selectFilter]="true"
          >
            <i class="icon-bar-chart-10" #icon></i>

            <app-select formControlName="option3">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>

            <p>Single Select, Filter</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <form-field
            [variant]="'outlined'"
            [size]="'large'"
            [theme]="'primary'"
            [width]="'full'"
            [selectMode]="'multiple'"
          >
            <i class="icon-bar-chart-12" #icon></i>

            <app-select formControlName="option2">
              @for (option of options; track option.value) {
                <app-option [value]="option.value" [label]="option.label" />
              }
            </app-select>
            <p>Multiple Select</p>
            <p class="error">Invalid Option</p>
          </form-field>

          <div></div>

          <button
            [variant]="'contained'"
            [theme]="'primary'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'large'"
            type="submit"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Submit</div>
          </button>

          <button
            [variant]="'outlined'"
            [theme]="'neutral'"
            [shape]="'rounded-square'"
            [width]="'full'"
            [size]="'large'"
            type="submit"
            (click)="toggleDisabled()"
          >
            @if (loading()) {
              <app-spinner />
            }
            <div style="padding: 0 3rem;">Toggle Disabled</div>
          </button>
        </form>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    .container {
      padding: 1rem;
      flex-direction: row;
      gap: 2rem;

      > .container-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 3rem;

        > .button-demo {
          display: flex;
          flex-direction: row;
          gap: 1rem;
        }
      }
    }

    .tmp {
      height: 3rem;
      width: 5rem;
      background-color: red;
      position: relative;
    }

    .form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem;
    }

    .item-text > button {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  `,
})
export class DemoComponent {
  userDetails = userDetails;
  options = options;

  toggle = signal(false);

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    option: [[], [Validators.required]],
    option2: [[], [Validators.required]],
    option3: [[], [Validators.required]],
  });

  loading = signal(false);

  onSubmit() {
    this.form.controls.name.markAsTouched({ onlySelf: true });
    this.form.controls.email.markAsTouched({ onlySelf: true });
    this.form.controls.option.markAsTouched({ onlySelf: true });
    this.form.controls.option2.markAsTouched({ onlySelf: true });
    this.form.controls.option3.markAsTouched({ onlySelf: true });

    this.form.controls.name.updateValueAndValidity();
    this.form.controls.email.updateValueAndValidity();
    this.form.controls.option.updateValueAndValidity();
    this.form.controls.option2.updateValueAndValidity();
    this.form.controls.option3.updateValueAndValidity();

    console.log(
      this.form.controls.name.value,
      this.form.controls.email.value,
      this.form.controls.option.value,
      this.form.controls.option2.value,
      this.form.controls.option3.value,
    );
  }

  toggleDisabled() {
    if (this.form.controls.name.disabled) {
      this.form.controls.name.enable();
      this.form.controls.email.enable();
      this.form.controls.option.enable();
      this.form.controls.option2.enable();
      this.form.controls.option3.enable();
    } else {
      this.form.controls.name.disable();
      this.form.controls.email.disable();
      this.form.controls.option.disable();
      this.form.controls.option2.disable();
      this.form.controls.option3.disable();
    }
  }

  handleOnClick() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }
}
