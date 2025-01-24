import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Achievement } from '../../model/Achievement';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import {
  MatListItem,
  MatListItemAvatar,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';

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
  ],
  templateUrl: './achievement-item.component.html',
  styleUrl: './achievement-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementItemComponent {
  readonly achievement = input.required<Achievement>();
}
