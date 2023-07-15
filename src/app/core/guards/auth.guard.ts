import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // const currentUser = authService.currentUserValue;
  const currentUser = authService.currentUserSubject.value;
  if (currentUser === 'user') {
    // authorized so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
