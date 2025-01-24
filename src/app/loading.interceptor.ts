import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from './loading.service';
import { tap } from 'rxjs';

export function LoadingInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.increment();
    return next(req).pipe(
      tap((res) => {
        if (res.type === HttpEventType.Response) {
          loadingService.decrement();
        }
      }),
    );
  };
}
