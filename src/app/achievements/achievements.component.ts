import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-achievements',
  imports: [JsonPipe],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  authService = inject(AuthenticationService);
}
