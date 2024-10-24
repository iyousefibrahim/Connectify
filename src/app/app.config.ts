import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './Core/Interceptors/headers.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './Core/Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: "top" })),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    NgxSpinnerModule,
  ]
};
