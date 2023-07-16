import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  console.log(state.url);

  // const currentUser = authService.currentUserValue;
  const currentUser = authService.currentUserSubject.value;
  if (state.url.includes('admin')) {
    if (currentUser === 'admin') {
      return true;
    } else if (currentUser === 'user') {
      router.navigate(['/shop']);
      return false;
    }
  } else {
    if (currentUser === 'admin') {
      router.navigate(['/admin']);
      return false;
    } else if (currentUser === 'user') {
      return true;
    }
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/login']);
  return false;
};
