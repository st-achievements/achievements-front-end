import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { from, switchMap } from 'rxjs';

export function AuthenticationInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const authenticationService = inject(AuthenticationService);
    const tokenPromise =
      authenticationService.userFirebase()?.getIdToken() ??
      Promise.resolve(null);
    return from(tokenPromise).pipe(
      switchMap((token) => {
        let headers = req.headers;
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return next(
          req.clone({
            headers,
          }),
        );
      }),
    );
  };
}
