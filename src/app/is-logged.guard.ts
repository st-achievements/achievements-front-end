import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export function IsLoggedGuard(): CanActivateFn {
  return () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);
    const isLogged = !!authenticationService.userFirebase();
    if (!isLogged) {
      return new RedirectCommand(router.parseUrl('/login'));
    }
    return true;
  };
}
