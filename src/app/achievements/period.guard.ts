import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PeriodService } from '../period.service';
import { RouteParams } from '../route.params';
import { map } from 'rxjs';

export function PeriodGuard(): CanActivateFn {
  return (route) => {
    const yearParam = route.paramMap.get(RouteParams.p.year);
    const periods$ = inject(PeriodService).periods$;
    return periods$.pipe(
      map((periods) => {
        const isValidYear = periods.some(
          (period) => period.year === Number(yearParam),
        );
        if (isValidYear) {
          return true;
        }
        return createUrlTreeFromSnapshot(route, [new Date().getFullYear()]);
      }),
    );
  };
}
