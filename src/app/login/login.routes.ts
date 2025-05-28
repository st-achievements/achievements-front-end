import { Routes } from '@angular/router';
import { IsNotLoggedGuard } from '../is-not-logged.guard';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [IsNotLoggedGuard()],
    title: 'Login',
  },
];