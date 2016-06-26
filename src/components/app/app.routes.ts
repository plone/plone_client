import {provideRouter, RouterConfig} from '@angular/router';
import {App} from './app.component';

const AppRoutes: RouterConfig = [
    { path: '', component: App },
    { path: '/:*', component: App },
    { path: '/:**/:*', component: App }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(AppRoutes)
];