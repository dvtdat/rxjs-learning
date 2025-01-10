import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  Component,
  computed,
  contentChildren,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { startWith } from 'rxjs';

// eslint-disable-next-line import/no-cycle
import { FormFieldComponent } from '../form-field/form-field.component';
import { OptionComponent } from '../option/option.component';

type Option = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
  host: {
    '[class]': 'formField.element.size()',
  },
  imports: [CdkConnectedOverlay, CommonModule],
  template: `
    <div class="custom-select" (keydown.enter)="onEnter()">
      @if (formField.selectFilter()) {
        <input
          class="filter-input"
          type="text"
          placeholder="Select"
          formControlName="searchInput"
          (input)="handleInputChange($event)"
          [disabled]="formField.disabled()"
          value="{{ searchInputValue() }}"
        />
      } @else if (this.selectedOptions().length) {
        @if (this.formField.selectMode() === 'single') {
          <p class="selected-option">
            {{ this.selectedOptions()[0].label }}
          </p>
        } @else {
          <div class="multiple-option-container">
            @for (
              option of this.selectedOptions().slice(0, 2);
              track option.value
            ) {
              <div>
                <p>{{ option.label }}</p>
                <i
                  class="icon-x"
                  (click)="handleRemoveSelectedOption($event, option)"
                ></i>
              </div>
            }

            @if (this.selectedOptions().length > 2) {
              <div>
                <p>+{{ this.selectedOptions().length - 2 }}</p>
              </div>
            }
          </div>
        }
      } @else {
        <p>Select</p>
      }
    </div>

    @if (this.selectedOptionsLength() > 0) {
      <i
        class="icon-x-circle last-icon"
        (click)="handleClearSelectedOptions($event)"
      ></i>
    } @else {
      <i
        class="icon-chevron-down last-icon"
        [class.rotate]="formField.toggleDropdown()"
      ></i>
    }

    @if (cdkOverlayOrigin(); as cdkOverlayOrigin) {
      <ng-template
        cdkConnectedOverlay
        cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
        [cdkConnectedOverlayHasBackdrop]="true"
        [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
        [cdkConnectedOverlayOpen]="formField.toggleDropdown()"
        [cdkConnectedOverlayPositions]="[
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 0,
            offsetY: 4,
          },
        ]"
        (detach)="closeDropdown()"
        (backdropClick)="closeDropdown()"
      >
        <div
          class="{{ dropdownContainerClass() }}"
          [style.width.px]="formField.formContainerWidth()"
        >
          @for (option of options(); track option.label) {
            <div class="dropdown-item" (click)="toggleOption(option)">
              <p>{{ option.label }}</p>

              @if (this.isOptionSelected(option)) {
                <i class="icon-check-circle"></i>
              }
            </div>
          }

          @if (!options().length) {
            <div class="dropdown-item-notfound">No items found</div>
          }
        </div>
      </ng-template>
    }
  `,
  styles: `
    :host {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;

      &.small {
        font-size: 0.875rem;
      }

      &.medium {
        font-size: 1rem;
      }

      &.large {
        font-size: 1.125rem;
      }
    }

    .filter-input {
      min-width: 0;
      width: 100%;
      flex-grow: 1;
      height: 100%;
      outline: none;
      background-color: transparent;
      color: var(--primary);
      font-size: inherit;

      &::placeholder {
        color: var(--tertiary-300);
      }
    }

    .last-icon {
      flex-shrink: 0;
      width: max-content;
      font-size: inherit;
    }

    i {
      transition: all 0.2s ease-in-out;
      font-size: inherit;
    }

    i.rotate {
      transform: rotate(180deg);
    }

    .custom-select {
      width: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      white-space: nowrap;
      margin-right: 0.5rem;
      font-size: inherit;

      p.selected-option {
        color: var(--primary);
      }

      > .multiple-option-container {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        padding-left: -0.5rem;
        z-index: 10;
        width: 100%;
        overflow-x: auto;
        scrollbar-width: none;
        text-wrap: nowrap;

        > div {
          width: max-content;
          max-width: 6rem;

          height: 100%;
          background-color: var(--tertiary-100);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-direction: row;
          padding: 0 0.25rem;
          border-radius: 0.125rem;

          > p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .dropdown-container {
      height: max-content;
      max-height: 10rem;
      overflow-y: auto;
      background-color: var(--white);
      border-radius: 0.25rem;
      transition: all 0.2s ease-in-out;
      outline: 1px solid var(--tertiary-300);
      padding: 0.25rem 0;

      &.small {
        font-size: 0.875rem;
      }

      &.medium {
        font-size: 1rem;
      }

      &.large {
        font-size: 1.125rem;
      }

      :hover {
        background-color: var(--tertiary-50);
      }

      > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 0.75rem;
        color: var(--tertiary);
        cursor: pointer;
      }
    }

    .dropdown-item-notfound {
      width: 100%;
      justify-content: center;
      cursor: auto !important;
      text-align: center;
      background-color: var(--white) !important;
      color: var(--tertiary-300) !important;
    }
  `,
})
export class SelectComponent implements ControlValueAccessor {
  readonly formField = inject(FormFieldComponent);
  readonly appRef = inject(ApplicationRef);
  readonly cdkOverlayOrigin = this.formField.overlayOrigin;
  optionComponent = contentChildren(OptionComponent);

  selectedOptions = signal<Option[]>([]);
  selectedOptionsLength = computed(() => this.selectedOptions().length);

  value = signal<Option[] | undefined>(undefined);
  changeFn = signal<(value: Option[] | undefined) => void>(() => {});
  touchedFn = signal<() => void>(() => {});

  readonly fb = inject(FormBuilder);
  searchInput = this.fb.control('');
  searchInputValue = toSignal(
    this.searchInput.valueChanges.pipe(startWith(this.searchInput.value)),
  );

  dropdownContainerClass = computed(() => [
    'dropdown-container',
    this.formField.element.size(),
  ]);

  options = computed(() => {
    const parsedOption = this.optionComponent().map(option => {
      return {
        value: option.value(),
        label: option.label(),
      };
    });

    if (this.formField.selectFilter()) {
      return parsedOption.filter(option =>
        option.label
          .toLowerCase()
          .includes(this.searchInputValue()?.toLowerCase() ?? ''),
      );
    }
    return parsedOption;
  });

  toggleOption(option: Option) {
    if (this.formField.selectMode() === 'single') {
      this.selectedOptions.set([option]);
      this.searchInput.setValue(option.label);
      this.formField.toggleDropdown.set(false);
      this.changeFn()([option]);
    } else if (!this.selectedOptions().includes(option)) {
      this.selectedOptions.set([...this.selectedOptions(), option]);
      this.changeFn()([...this.selectedOptions()]);
    } else {
      this.selectedOptions.set(
        this.selectedOptions().filter(item => item !== option),
      );
      this.changeFn()([...this.selectedOptions()]);
    }
  }

  isSelected(option: Option): boolean {
    return this.selectedOptions().includes(option);
  }

  handleRemoveSelectedOption = (event: Event, option: Option) => {
    event.stopPropagation();
    this.selectedOptions.set(
      this.selectedOptions().filter(item => item !== option),
    );
  };

  handleClearSelectedOptions = (event: Event) => {
    event.stopPropagation();
    this.selectedOptions.set([]);
    this.changeFn()(undefined);

    if (this.formField.selectFilter()) {
      this.searchInput.setValue('');
    }
  };

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchInput.setValue(input.value);
    this.formField.toggleDropdown.set(true);
  }

  registerOnChange(fn: (value: Option[] | undefined) => void): void {
    this.changeFn.set(fn);
  }

  writeValue(obj: Option[]): void {
    this.value.set(obj);
    if ((this.value()?.length ?? 0) > 0) {
      this.changeFn()([this.value()?.[0]] as Option[]);
      this.searchInput.setValue((this.value()?.[0].label as string) ?? '');
      this.selectedOptions.set(this.value() ?? []);
    }
  }

  registerOnTouched(fn: () => void): void {
    this.touchedFn.set(fn);
  }

  closeDropdown() {
    this.formField.toggleDropdown.set(false);

    if (!this.searchInputValue()) {
      this.searchInput.setValue(this.selectedOptions()[0]?.label);
    }
  }

  isOptionSelected(option: Option): boolean {
    return this.selectedOptions().some(o => o.value === option.value);
  }

  onEnter() {
    if (this.options().length > 0) {
      this.toggleOption(this.options()[0]);
      this.searchInput.setValue(this.options()[0].label);
      this.appRef.tick();
    }
  }
}
