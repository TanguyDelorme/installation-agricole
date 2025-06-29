import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {AppInitService} from './core/services/app-init.service';
import {provideHttpClient} from '@angular/common/http';
import {InstallationStore} from './core/store/installation.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    InstallationStore,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppInitService) => () => config.init(),
      deps: [AppInitService],
      multi: true
    }
  ]
};
