import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuardGuard: CanActivateFn = (route, state) : boolean | UrlTree => {
  
  const _router = inject(Router)
  const _authService = inject(AuthService)
  if(_authService.checkLogin() == true) //if user is logged in
  {
    return true;
  }
  _router.navigate(['/login']);
  return false //if user is not logged in redirect to login page
};
