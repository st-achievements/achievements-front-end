import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Achievement } from '../model/Achievement';
import { MatList, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { AchievementItemComponent } from './achievement-item/achievement-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-achievements',
  imports: [
    NavbarComponent,
    FormsModule,
    AsyncPipe,
    MatList,
    MatListSubheaderCssMatStyler,
    MatDivider,
    AchievementItemComponent,
  ],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  constructor() {
    effect(() => {
      // TODO this is not working all the time, when moving to 2024 and then 2050, it works
      // it puts the 2024 again, but when trying to move again to 2050, it does not update
      this.router.navigate([], {
        queryParams: {
          year: this.year(),
        },
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute,
      });
    });
  }

  authService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly #year = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((query) => Number(query.get('year') ?? '2024')),
      tap((r) => console.log({ r })),
    ),
  );

  year = linkedSignal(() => this.#year());

  achievements$ = this.activatedRoute.data
    .pipe(map((data) => data['achievements'] as Achievement[]))
    .pipe(
      map((achievements) => {
        const completed = achievements.filter(
          (achievement) => achievement.achievedAt,
        );
        const progress = achievements.filter(
          (achievement) => !achievement.achievedAt,
        );
        return {
          completed,
          progress,
        };
      }),
    );
}
