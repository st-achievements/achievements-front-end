import { Routes } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard';
import { IsNotLoggedGuard } from './is-not-logged.guard';
import { AchievementsResolver } from './achievements/achievements.resolver';
import { PeriodsResolver } from './periods.resolver';
import { RouteParams } from './route.params';
import { PeriodGuard } from './achievements/period.guard';

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
    canActivate: [IsLoggedGuard(), PeriodGuard()],
    resolve: {
      [RouteParams.r.achievements]: AchievementsResolver(),
      [RouteParams.r.periods]: PeriodsResolver(),
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: '**',
    redirectTo: 'achievements',
  },
];
