/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { FORM_PROVIDERS, PathLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  {provide: LocationStrategy, useClass: PathLocationStrategy }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
