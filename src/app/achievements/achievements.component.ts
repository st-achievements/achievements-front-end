import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Achievement } from '../model/Achievement';
import { MatList, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { AchievementItemComponent } from './achievement-item/achievement-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PeriodService } from '../period.service';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { Period } from '../model/Period';
import { RouteParams } from '../route.params';
import { MatCard } from '@angular/material/card';

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
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatCard,
  ],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  constructor() {
    effect(() => {
      const year = this.periodSelected()?.year;
      if (!year) {
        return;
      }
      this.router.navigate([], {
        queryParams: {
          year,
        },
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute,
      });
    });
  }

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly periods = toSignal(inject(PeriodService).getPeriods(), {
    initialValue: [] as Period[],
  });

  readonly #year = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((query) =>
        this.periods().find(
          (period) =>
            period.year ===
            Number(query.get(RouteParams.q.year) ?? new Date().getFullYear()),
        ),
      ),
    ),
  );

  periodSelected = linkedSignal(() => this.#year());

  achievements$ = this.activatedRoute.data.pipe(
    map((data) => data[RouteParams.r.achievements] as Achievement[]),
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
