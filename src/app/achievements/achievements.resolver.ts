import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { API } from '../app.constants';
import { Achievement } from '../model/Achievement';
import { map } from 'rxjs';

export function AchievementsResolver(): ResolveFn<Achievement[]> {
  return (snapshot) => {
    const year = snapshot.queryParamMap.get('year');
    const obj = Object.fromEntries(
      Array.from({ length: 20 }, (_, index) => [2024 + index, index + 1]),
    ); // TODO API
    const id = year ? obj[year] : 1;
    console.log({ obj, id, year });
    const authenticationService = inject(AuthenticationService);
    const http = inject(HttpClient);
    return http
      .get<{
        achievements: Achievement[];
      }>(
        `${API.UserAchievementGetter}/v1/users/${authenticationService.user().userId}/period/${id}/achievements`,
      )
      .pipe(map(({ achievements }) => achievements));
  };
}
