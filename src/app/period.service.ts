import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, share, timer } from 'rxjs';
import { Period } from './model/period';
import { HttpClient } from '@angular/common/http';
import { API } from './app.constants';
import { Pagination } from './model/pagination';
import dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class PeriodService {
  private readonly httpClient = inject(HttpClient);

  private periods$?: Observable<Period[]>;

  getPeriods(): Observable<Period[]> {
    return (this.periods$ ??= this.httpClient
      .get<Pagination<Period>>(`${API.PeriodManagement}/v1/periods`, {
        params: {
          endAt: dayjs().endOf('year').format('YYYY-MM-DD'),
        },
      })
      .pipe(
        map(({ items }) =>
          items.map((period) => {
            period.year = dayjs(period.startAt).year();
            return period;
          }),
        ),
        share({
          connector: () => new ReplaySubject(1),
          resetOnError: true,
          resetOnComplete: () => timer(1000 * 60 * 15),
          resetOnRefCountZero: false,
        }),
      ));
  }
}
