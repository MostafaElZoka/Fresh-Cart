import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations'
import {provideToastr} from 'ngx-toastr'
import { headerInterceptor } from './Core/Interceptors/header.interceptor';
import { errorsInterceptor } from './Core/Interceptors/errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withViewTransitions( /*so that routerLink and routerLinkActive transitions are smooth*/)),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor,errorsInterceptor])),
    // importProvidersFrom(BrowserAnimationsModule), 
    provideAnimations(), //to use angular material and other animation libraries like ngx-owl-carousel-o
    provideToastr(), // to use toastr notifications
  ],
};
