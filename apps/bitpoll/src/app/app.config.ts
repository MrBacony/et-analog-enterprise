import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideAuthClient, authInterceptor } from '@analog-tools/auth/angular';
import { withComponentInputBinding } from '@angular/router';
import { provideTrpcClient } from '../trpc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(withComponentInputBinding()),
    provideClientHydration(),
    provideAuthClient(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor, authInterceptor])
    ),

    provideTrpcClient(),
  ],
};
