import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@analog-tools/auth/angular';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { lastValueFrom, map } from 'rxjs';
/**
 * Auth guard that checks if the user is authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const platform_id = inject(PLATFORM_ID);

  if(isPlatformBrowser(platform_id)) {
  const authService = inject(AuthService);

  authService.userResource.reload();
  console.log('Checking authentication status...');
  console.log('Is authenticated:', authService.isAuthenticated());
  console.log('User data:', authService.user());

  const isAuthenticated$ = toObservable(authService.isAuthenticated);

  return lastValueFrom(isAuthenticated$.pipe(
    // If the user is authenticated, allow access
    map((isAuthenticated) => { 
      if(!isAuthenticated) {
        console.log('User is not authenticated, redirecting to login');
        authService.login(state.url);
      } else {
        console.log('User is authenticated, allowing access');
      }
      return true; 
    })));
  } else {
    // If not in browser platform, allow access
    console.log('Not in browser platform, allowing access');
    return false;
  }
};

/**
 * Role-based guard that checks if the user has the required roles
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get required roles from route data
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    // No specific roles required
    return true;
  }

  if (!authService.isAuthenticated()) {
    authService.login(state.url);
    return false;
  }

  // Check if user has any of the required roles
  if (authService.hasRoles(requiredRoles)) {
    return true;
  }

  // User doesn't have required roles, redirect to access denied
  router.navigate(['/access-denied']);
  return false;
};
