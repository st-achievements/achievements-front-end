import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { AuthenticationService } from '../../authentication.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, MatFabButton, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly authenticationService = inject(AuthenticationService);

  readonly user = this.authenticationService.user;

  async logout() {
    await this.authenticationService.logout();
  }
}
