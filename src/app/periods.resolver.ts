import { ResolveFn } from '@angular/router';
import { Period } from './model/period';
import { inject } from '@angular/core';
import { PeriodService } from './period.service';

export function PeriodsResolver(): ResolveFn<Period[]> {
  return () => inject(PeriodService).periods$;
}
