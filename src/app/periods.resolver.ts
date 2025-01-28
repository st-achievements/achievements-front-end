import { ResolveFn } from '@angular/router';
import { Period } from './model/Period';
import { inject } from '@angular/core';
import { PeriodService } from './period.service';

export function PeriodsResolver(): ResolveFn<Period[]> {
  return () => inject(PeriodService).getPeriods();
}
