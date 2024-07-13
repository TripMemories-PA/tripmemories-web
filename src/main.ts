import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { inject } from '@vercel/analytics';
import { environment } from './environments/environment';
import Pusher from 'pusher-js';
import { injectSpeedInsights } from '@vercel/speed-insights';

if (environment.production) {
    inject();
    injectSpeedInsights();
}

if (!environment.production) {
    Pusher.logToConsole = true;
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
