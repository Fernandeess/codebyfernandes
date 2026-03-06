import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Auth Guard
 * Protects private routes by checking if user is authenticated
 * Redirects unauthenticated users to login page
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Store the URL the user was trying to access for redirect after login
    sessionStorage.setItem('redirectUrl', state.url);
    this.router.navigate(['/login']);
    return false;
  }
}
