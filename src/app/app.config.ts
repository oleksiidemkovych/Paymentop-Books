import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import * as BookEffects from './books/state/book.effects';
import { BOOK_FEATURE_KEY, bookReducer } from './books/state/book.reducer';
import { BookFacade } from './books/state/book.facade';
import { BookApiService } from './books/services/book-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    BookApiService,
    BookFacade,
    provideHttpClient(),
    provideStore({ [BOOK_FEATURE_KEY]: bookReducer }), // Register the reducer directly with BOOK_FEATURE_KEY
    provideEffects([BookEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
};
