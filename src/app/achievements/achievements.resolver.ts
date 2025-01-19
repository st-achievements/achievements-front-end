import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { from, switchMap } from 'rxjs';

export function AchievementsResolver(): ResolveFn<any> {
  return () => {
    const authenticationService = inject(AuthenticationService);
    const http = inject(HttpClient);
    return from(
      // TODO move to interceptor
      authenticationService.user()?.getIdToken() ?? Promise.resolve(''),
    ).pipe(
      switchMap((idToken) => {
        return http.get(
          `https://usr-achievement-getter-http-a6okgsceua-rj.a.run.app/v1/users/1/period/1/achievements`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
      }),
    );
  };
}
