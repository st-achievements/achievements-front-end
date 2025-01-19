import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  imports: [MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authenticationService = inject(AuthenticationService);

  async onLogin() {
    await this.authenticationService.loginWithGoogle();
  }
}
