import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appHttpInterceptor } from './services/app-http.interceptor';
import { AppStateService } from './services/app-state.service';

export const appConfig: ApplicationConfig = {
  providers: [
    AppStateService,
    provideRouter(routes),
    provideHttpClient(),
    ReactiveFormsModule,
    FormsModule,
    provideHttpClient(withInterceptors([appHttpInterceptor])),
  ],
};
