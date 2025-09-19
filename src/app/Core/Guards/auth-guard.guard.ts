import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const _router = inject(Router)

  let token = localStorage.getItem("userToken");

  if(token !== null)
    {
      return true;
    }
    _router.navigate(['/login']);
    return false;
};
