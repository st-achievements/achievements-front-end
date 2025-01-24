import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthenticationService } from './authentication.service';
import { take } from 'rxjs';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'st-achievements',
        appId: '1:984964234239:web:647f0b73735664d622c5ca',
        storageBucket: 'st-achievements.firebasestorage.app',
        apiKey: 'AIzaSyCSIQOzFvIh-0988r0c-cuIPGqVP2jLscE',
        authDomain: 'st-achievements.firebaseapp.com',
        messagingSenderId: '984964234239',
      }),
    ),
    provideAuth(() => getAuth()),
    provideAppInitializer(() => {
      const authenticationService = inject(AuthenticationService);
      return authenticationService.firstAuthSignal.pipe(take(1));
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([LoadingInterceptor(), AuthenticationInterceptor()]),
    ),
  ],
};
