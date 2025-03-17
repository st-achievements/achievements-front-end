import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Achievement } from '../model/achievement';
import { LoadingMessageContextToken } from '../loading-message-context-token';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AchievementsService {
  private readonly httpClient = inject(HttpClient);

  getAchievements({ userId, periodId }: { userId: number; periodId: number }) {
    return this.httpClient
      .get<{
        achievements: Achievement[];
      }>(
        `${environment.UserAchievementGetterApi}/v1/users/${userId}/period/${periodId}/achievements`,
        {
          context: new HttpContext().set(
            LoadingMessageContextToken,
            'Loading achievements...',
          ),
        },
      )
      .pipe(map(({ achievements }) => achievements));
  }
}
