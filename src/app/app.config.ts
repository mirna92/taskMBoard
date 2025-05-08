import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './state/task.state';
import { AuthInterceptor } from './api-key.interceptor';
import { FeatureModule } from '@features/feature.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(NgxsModule.forRoot([TaskState]),FeatureModule),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      positionClass: "toast-bottom-left",
      timeOut: 5000,
      progressBar: true,
    }),
    provideNativeDateAdapter(),
    { 
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: { appearance: 'outline', floatLabel: 'always' } 
    },
  ],
  
};
