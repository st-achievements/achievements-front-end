import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Achievement } from '../../model/achievement';
import { AchievementLevelEnum } from '../../model/achievement-level.enum';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-achievement-item',
  imports: [MatIcon, DatePipe, MatProgressBar, DecimalPipe],
  templateUrl: './achievement-item.component.html',
  styleUrl: './achievement-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'levelClassName()',
    '[class.achieved]': 'achievement().achievedAt',
  },
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

  readonly noImgTitle = computed(() => {
    if (this.achievement().achievementImageUrl) {
      return undefined;
    }
    const split = this.achievement()
      .achievementName.split(' ')
      .map((item) =>
        item
          .slice(0, 1)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      )
      .filter((item) => item === item.toUpperCase())
      .slice(0, 3);
    return split.join('');
  });
}
