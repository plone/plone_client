import 'angular2-universal/polyfills';

import {bootstrap, enableProdMode, BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';
import {ROUTER_PROVIDERS} from '@angular/router';

import {App} from './components/app/app.component';

enableProdMode();

bootstrap(App, [
  ...BROWSER_ROUTER_PROVIDERS,
  ...BROWSER_HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS
]);
