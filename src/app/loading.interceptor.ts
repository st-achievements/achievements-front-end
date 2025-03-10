import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from './loading.service';
import { delay, tap } from 'rxjs';
import { LoadingMessageContextToken } from './loading-message-context-token';

export function LoadingInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const loadingService = inject(LoadingService);
    const message = req.context.get(LoadingMessageContextToken);
    loadingService.increment({
      message,
    });
    return next(req).pipe(
      delay(2500),
      tap((res) => {
        if (res.type === HttpEventType.Response) {
          loadingService.decrement();
        }
      }),
    );
  };
}
