import 'angular2-universal/polyfills';

import {bootstrap, enableProdMode, BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';
import {ROUTER_PROVIDERS} from '@angular/router';

import {AppWrapper} from './components/app/appwrapper.component';
import {PloneRouter} from './router';
import {DefaultRouterUrlSerializer, RouterUrlSerializer, Router} from '@angular/router';
import {UrlSegment, Tree, TreeNode, rootNode, UrlTree} from '@angular/router/src/segments';
import {BaseException} from '@angular/core';
import {ApplicationRef} from '@angular/core';
import {OpaqueToken, ComponentResolver} from '@angular/core';
import {RouterOutletMap} from '@angular/router';
import {LocationStrategy, PathLocationStrategy, Location} from '@angular/common';


function routerFactory(app: ApplicationRef, componentResolver: ComponentResolver,
                       urlSerializer: RouterUrlSerializer, routerOutletMap: RouterOutletMap,
                       location: Location): Router {
  if (app.componentTypes.length == 0) {
    throw new BaseException("Bootstrap at least one component before injecting Router.");
  }
  // TODO: vsavkin this should not be null
  let router = new PloneRouter(null, app.componentTypes[0], componentResolver, urlSerializer,
                          routerOutletMap, location);
  app.registerDisposeListener(() => router.dispose());
  return router;
}


enableProdMode();

bootstrap(AppWrapper, [
  ...BROWSER_ROUTER_PROVIDERS,
  ...BROWSER_HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  // {provide: RouterUrlSerializer, useClass: PloneRouter}
  {
    provide: Router,
    useFactory: routerFactory,
    deps: /*@ts2dart_const*/
        [ApplicationRef, ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location],
  }
]);
