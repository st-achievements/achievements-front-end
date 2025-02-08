import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Achievement } from '../../model/achievement';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import {
  MatListItem,
  MatListItemAvatar,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { AchievementLevelEnum } from '../../model/achievement-level.enum';

@Component({
  selector: 'app-achievement-item',
  imports: [
    DecimalPipe,
    MatListItem,
    MatListItemAvatar,
    MatListItemLine,
    MatListItemTitle,
    MatProgressBar,
    DatePipe,
    MatListItem,
    DatePipe,
    NgOptimizedImage,
    MatProgressBar,
    DecimalPipe,
    MatIcon,
    MatListItemMeta,
  ],
  templateUrl: './achievement-item.component.html',
  styleUrl: './achievement-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementItemComponent {
  readonly achievement = input.required<Achievement>();

  private readonly levelClassNames: Record<number, string> = {
    [AchievementLevelEnum.Bronze]: 'bronze',
    [AchievementLevelEnum.Silver]: 'silver',
    [AchievementLevelEnum.Gold]: 'gold',
    [AchievementLevelEnum.Platinum]: 'platinum',
  };

  readonly levelClassName = computed(
    () => this.levelClassNames[this.achievement().achievementLevelId],
  );
}
