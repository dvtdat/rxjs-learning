import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NavigationComponent } from '../../components/atoms/navigation/navigation.component';
import { FormNavigationItemDirective } from '../../directives/form-navigation-item.directive';
import { LinkNavigationItemDirective } from '../../directives/link-navigation-item.directive';
import { PureFormDirective } from '../../directives/pure-form.directive';

@Component({
  selector: 'app-nav',
  imports: [
    NavigationComponent,
    RouterOutlet,
    RouterLink,
    LinkNavigationItemDirective,
    FormNavigationItemDirective,
    PureFormDirective,
    ReactiveFormsModule,
  ],
  template: `
    <div class="screen">
      <div style="position: fixed; bottom: 0; width: 100%;">
        <navigation>
          <div
            appLinkNavigationItem
            routerLink="/nav/dashboard"
            routerLinkActive="selected"
          >
            <i class="icon-monitor-01"></i>
            <p>Dashboard</p>
          </div>

          <div
            appLinkNavigationItem
            routerLink="/nav/wallet"
            routerLinkActive="selected"
          >
            <i class="icon-wallet-01"></i>
            <p>Wallet</p>
          </div>

          <div
            appLinkNavigationItem
            routerLink="/nav/contact"
            routerLinkActive="selected"
          >
            <i class="icon-user-01"></i>
            <p>Contact</p>
          </div>

          <div
            appLinkNavigationItem
            routerLink="/nav/settings"
            routerLinkActive="selected"
          >
            <i class="icon-settings-01"></i>
            <p>Settings</p>
          </div>
        </navigation>
      </div>

      <!-- <div style="position: fixed; bottom: 0; width: 100%;">
        <navigation appPureForm [formControl]="navForm">
          <div appFormNavigationItem value="icon-monitor-01">
            <i class="icon-monitor-01"></i>
            <p>Dashboard</p>
          </div>

          <div appFormNavigationItem value="icon-wallet-01">
            <i class="icon-wallet-01"></i>
            <p>Wallet</p>
          </div>

          <div appFormNavigationItem value="icon-user-01">
            <i class="icon-user-01"></i>
            <p>Contact</p>
          </div>

          <div appFormNavigationItem value="icon-settings-01">
            <i class="icon-settings-01"></i>
            <p>Settings</p>
          </div>
        </navigation>
      </div> -->

      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    :host {
      width: 100vw;
    }

    .screen {
      height: 2000px;
      background-color: var(--white);
    }
  `,
})
export class NavComponent {
  navForm = new FormControl('icon-monitor-01');
}
