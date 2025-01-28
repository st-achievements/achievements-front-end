import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { API } from '../app.constants';
import { Achievement } from '../model/Achievement';
import { map, switchMap } from 'rxjs';
import { PeriodService } from '../period.service';
import { RouteParams } from '../route.params';

export function AchievementsResolver(): ResolveFn<Achievement[]> {
  return (snapshot) => {
    const periodService = inject(PeriodService);
    const year =
      snapshot.queryParamMap.get(RouteParams.q.year) ??
      new Date().getFullYear();
    const period$ = periodService
      .getPeriods()
      .pipe(
        map((periods) =>
          periods.find((period) => period.year === Number(year)),
        ),
      );
    const authenticationService = inject(AuthenticationService);
    const http = inject(HttpClient);
    return period$.pipe(
      switchMap((period) => {
        const id = period?.periodId ?? 1;
        return http
          .get<{
            achievements: Achievement[];
          }>(
            `${API.UserAchievementGetter}/v1/users/${authenticationService.user().userId}/period/${id}/achievements`,
          )
          .pipe(map(({ achievements }) => achievements));
      }),
    );
  };
}
