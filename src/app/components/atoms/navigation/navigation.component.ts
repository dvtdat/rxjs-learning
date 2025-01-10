import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  InjectionToken,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

import { SetItemsQuantityDirective } from '../../../directives/set-items-quantity.directive';
import { SetSliderOffsetDirective } from '../../../directives/set-slider-offset.directive';
import { SetSliderWidthDirective } from '../../../directives/set-slider-width.directive';

export type NavigationItem = {
  active$: Observable<boolean>;
};

export const NAVIGATION_ITEM = new InjectionToken<NavigationItem>(
  'NAVIGATION_ITEM',
);

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [
    SetItemsQuantityDirective,
    SetSliderOffsetDirective,
    SetSliderWidthDirective,
  ],
  template: `
    <div
      class="select-indicator-container"
      [appSetSliderWidth]="sliderWidth()"
      [appSetSliderOffset]="sliderOffset()"
      [appSetItemsQuantity]="items().length"
    >
      <div
        class="select-slider"
        style="transform: translateX(var(--slider-offset, 0));"
      ></div>
    </div>
    <div class="navigation-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;

      height: 3rem;
      width: 100%;
      background-color: var(--white);

      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 500;
      font-style: normal;

      border-top: 1px solid var(--tertiary-100);

      .select-indicator-container {
        display: block;

        width: 100%;
        height: 0.25rem;

        padding: 0 1rem;

        > .select-slider {
          width: var(--slider-width);
          height: 100%;

          border-radius: 0 0 9999rem 9999rem;

          background-color: var(--blue);
          transition: transform 0.3s ease;
          transform: translateX(var(--slider-offset, 0));
        }
      }

      ::ng-deep > .navigation-container {
        display: grid;
        grid-template-columns: repeat(var(--items-length, 4), 1fr);

        align-items: center;
        justify-content: center;
        gap: 0.75rem;

        height: 100%;
        padding: 0 1rem;

        > * {
          width: 100%;
          justify-self: center;

          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;

          height: 100%;

          padding-top: 0.375rem;

          color: var(--tertiary-300);

          transition:
            color 0.2s ease,
            border-top 0.2s ease;

          &.selected {
            color: var(--blue);
          }

          ::ng-deep > i {
            font-size: 1.25rem;
          }
        }
      }
    }
  `,
})
export class NavigationComponent {
  items = contentChildren(NAVIGATION_ITEM);
  itemsRef = contentChildren(NAVIGATION_ITEM, { read: ElementRef });
  items$ = toObservable(this.items);

  activeItemIndex = toSignal(
    this.items$.pipe(
      switchMap(items => combineLatest(items.map(item => item.active$))),
      map(items => items.findIndex(item => item)),
    ),
  );

  sliderWidth = computed(() => {
    if (!this.itemsRef()[0]) {
      return 0;
    }

    const quantity = this.items().length;
    const width = (this.itemsRef()[0].nativeElement as HTMLElement).offsetWidth;
    return (width - 12 * (quantity - 1) - 32) / quantity;
  });

  sliderOffset = computed(() => {
    if (this.activeItemIndex() === -1 || this.activeItemIndex() === undefined) {
      return 0;
    }

    return (this.activeItemIndex() ?? 0) * (this.sliderWidth() + 12);
  });
}
