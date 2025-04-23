import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { apiKeyInterceptor } from './api-key.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './state/task.state';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    importProvidersFrom(NgxsModule.forRoot([TaskState])),
    provideRouter(routes),
    provideNativeDateAdapter(),
  ],
};
