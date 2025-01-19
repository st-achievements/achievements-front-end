import { Routes } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard';
import { IsNotLoggedGuard } from './is-not-logged.guard';
import { AchievementsResolver } from './achievements/achievements.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [IsNotLoggedGuard()],
  },
  {
    path: 'achievements',
    loadComponent: () =>
      import('./achievements/achievements.component').then(
        (m) => m.AchievementsComponent,
      ),
    canActivate: [IsLoggedGuard()],
    resolve: {
      achievements: AchievementsResolver(),
    },
  },
  {
    path: '**',
    redirectTo: 'achievements',
  },
];
