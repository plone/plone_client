import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {Component, ComponentResolver} from '@angular/core';

import {Router, RouterOutletMap} from '@angular/router';
import {DefaultUrlSerializer, UrlSerializer} from '@angular/router';

@Component({selector: 'fake-app-root-comp', template: `<span></span>`})
class FakeAppRootCmp {
}

function routerFactory(
    componentResolver: ComponentResolver, urlSerializer: UrlSerializer,
    routerOutletMap: RouterOutletMap, location: Location): Router {
  return new Router(
      FakeAppRootCmp, componentResolver, urlSerializer, routerOutletMap, location);
}

export const ROUTER_FAKE_PROVIDERS: any[] = /*@ts2dart_const*/[
  RouterOutletMap,
  /* @ts2dart_Provider */ {provide: Location, useClass: SpyLocation},
  /* @ts2dart_Provider */ {provide: UrlSerializer, useClass: DefaultUrlSerializer},
  /* @ts2dart_Provider */ {
    provide: Router,
    useFactory: routerFactory,
    deps: /*@ts2dart_const*/
        [ComponentResolver, UrlSerializer, RouterOutletMap, Location]
  }
];
