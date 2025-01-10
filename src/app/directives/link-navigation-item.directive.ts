import { Directive, inject } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { startWith } from 'rxjs';

import {
  NAVIGATION_ITEM,
  NavigationItem,
} from '../components/atoms/navigation/navigation.component';

@Directive({
  hostDirectives: [RouterLinkActive],
  selector: '[appLinkNavigationItem]',
  host: {
    '[class.selected]': 'routerLinkActive.isActive',
  },
  providers: [
    {
      provide: NAVIGATION_ITEM,
      useExisting: LinkNavigationItemDirective,
      multi: true,
    },
  ],
})
export class LinkNavigationItemDirective implements NavigationItem {
  routerLinkActive = inject(RouterLinkActive);
  active$ = this.routerLinkActive.isActiveChange.pipe(
    startWith(this.routerLinkActive.isActive),
  );
}
