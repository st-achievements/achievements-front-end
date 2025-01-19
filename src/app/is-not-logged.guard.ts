import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export function IsNotLoggedGuard(): CanActivateFn {
  return () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);
    const isLogged = !!authenticationService.user();
    if (isLogged) {
      return new RedirectCommand(router.parseUrl('/achievements'));
    }
    return true;
  };
}
