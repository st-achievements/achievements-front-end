import { Routes } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard';
import { IsNotLoggedGuard } from './is-not-logged.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes').then((m) => m.loginRoutes),
    canActivate: [IsNotLoggedGuard()],
  },
  {
    path: 'achievements',
    loadChildren: () =>
      import('./achievements/achievements.routes').then(
        (m) => m.achievementsRoutes,
      ),
    canActivate: [IsLoggedGuard()],
  },
  {
    path: '**',
    redirectTo: () => `achievements/${new Date().getFullYear()}`,
  },
];
