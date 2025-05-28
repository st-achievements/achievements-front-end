import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Achievement } from '../model/achievement';
import { AchievementItemComponent } from './achievement-item/achievement-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PeriodService } from '../period.service';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { Period } from '../model/period';
import { RouteParams } from '../route.params';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-achievements',
  imports: [
    NavbarComponent,
    FormsModule,
    AsyncPipe,
    AchievementItemComponent,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatProgressBar,
    DecimalPipe,
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
      this.router.navigate(['../', year], {
        relativeTo: this.activatedRoute,
      });
    });
  }

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly periods = toSignal(inject(PeriodService).periods$, {
    initialValue: [] as Period[],
  });

  readonly #year = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((path) =>
        this.periods().find(
          (period) =>
            period.year ===
            Number(path.get(RouteParams.p.year) ?? new Date().getFullYear()),
        ),
      ),
    ),
  );

  readonly periodSelected = linkedSignal(() => this.#year());

  readonly achievements$: Observable<{
    completed: Achievement[];
    progress: Achievement[];
  }> = this.activatedRoute.data.pipe(
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
