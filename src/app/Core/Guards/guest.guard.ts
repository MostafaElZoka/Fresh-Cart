import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const guestGuard: CanActivateFn = (route, state): UrlTree | boolean => {
  let _router = inject(Router)
  let _authService = inject(AuthService)
  if(_authService.checkLogin() != false) //if user is logged in
  {
    return _router.parseUrl('/home'); //if user is logged in redirect to home page
  }
  return true; //if user is not logged in allow access to route and go to login or register page
};
