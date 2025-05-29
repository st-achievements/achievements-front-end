import { Routes } from '@angular/router';
import { PeriodGuard } from './period.guard';
import { RouteParams } from '../route.params';
import { AchievementsResolver } from './achievements.resolver';
import { PeriodsResolver } from '../periods.resolver';
import { AchievementsComponent } from './achievements.component';

export const achievementsRoutes: Routes = [
  {
    path: `:${RouteParams.p.year}`,
    component: AchievementsComponent,
    canActivate: [PeriodGuard()],
    resolve: {
      [RouteParams.r.achievements]: AchievementsResolver(),
      [RouteParams.r.periods]: PeriodsResolver(),
    },
    title: 'My achievements',
  },
];
