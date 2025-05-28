import { Routes } from '@angular/router';
import { RouteParams } from './route.params';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes').then((m) => m.loginRoutes),
  },
  {
    path: `achievements/:${RouteParams.p.year}`,
    loadChildren: () =>
      import('./achievements/achievements.routes').then(
        (m) => m.achievementsRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: () => `achievements/${new Date().getFullYear()}`,
  },
];
