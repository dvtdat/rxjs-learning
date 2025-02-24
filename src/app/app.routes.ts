/* eslint-disable sonarjs/function-return-type */

import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { TestComponent } from './features/test/test.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
