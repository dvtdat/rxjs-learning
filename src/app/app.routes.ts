/* eslint-disable sonarjs/function-return-type */

import { Routes } from '@angular/router';

import { AdminComponent } from './features/admin/admin.component';
import { PermissionComponent } from './features/admin/permission/permission.component';
import { RoleComponent } from './features/admin/role/role.component';
import { DemoComponent } from './features/demo/demo.component';
import { HomeComponent } from './features/home/home.component';
import { ContactComponent } from './features/nav/contact/contact.component';
import { DashboardComponent } from './features/nav/dashboard/dashboard.component';
import { NavComponent } from './features/nav/nav.component';
import { SettingsComponent } from './features/nav/settings/settings.component';
import { WalletComponent } from './features/nav/wallet/wallet.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'permission',
        component: PermissionComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
    ],
  },
  { path: 'demo', component: DemoComponent },
  {
    path: 'nav',
    component: NavComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'wallet',
        component: WalletComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
];
