import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken');
    if (token) {
      req = req.clone({
        setHeaders: { token }
      });
      console.log('Request to:', req.url, 'with headers:', req.headers);
    }
  }

  return next(req);
};
