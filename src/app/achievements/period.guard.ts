import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PeriodService } from '../period.service';
import { RouteParams } from '../route.params';
import { map } from 'rxjs';

export function PeriodGuard(): CanActivateFn {
  return (route) => {
    const year = route.queryParamMap.get(RouteParams.q.year);
    const periods$ = inject(PeriodService).getPeriods();
    return periods$.pipe(
      map((periods) => {
        const isValidYear = periods.some(
          (period) => period.year === Number(year),
        );
        if (isValidYear) {
          return true;
        }
        return createUrlTreeFromSnapshot(route, [], {
          year: new Date().getFullYear(),
        });
      }),
    );
  };
}
