import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Achievement } from '../model/achievement';
import { map, switchMap } from 'rxjs';
import { PeriodService } from '../period.service';
import { RouteParams } from '../route.params';
import { AchievementsService } from './achievements.service';

export function AchievementsResolver(): ResolveFn<Achievement[]> {
  return (snapshot) => {
    const periodService = inject(PeriodService);
    const year = snapshot.paramMap.get(RouteParams.p.year);
    if (!year) {
      throw new Error(
        `Achievements resolver must have a ${RouteParams.p.year} path param defined`,
      );
    }
    const period$ = periodService.periods$.pipe(
      map((periods) => periods.find((period) => period.year === Number(year))),
    );
    const authenticationService = inject(AuthenticationService);
    const achievementsService = inject(AchievementsService);
    return period$.pipe(
      switchMap((period) => {
        const periodId = period?.periodId ?? 1;
        return achievementsService.getAchievements({
          userId: authenticationService.user().userId,
          periodId,
        });
      }),
    );
  };
}
