import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(App, {
    providers: [provideHttpClient(), provideRouter(APP_ROUTES)],
});
