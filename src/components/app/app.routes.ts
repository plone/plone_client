import {provideRouter, RouterConfig} from '@angular/router';
import {App} from './app.component';

export const routes: RouterConfig = [
    { path: '', component: App },
    { path: ':*', component: App },
    { path: ':**/:*', component: App }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
