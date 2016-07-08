
import {Location, LocationStrategy} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component, Injector} from '@angular/core';
import {ComponentResolver} from '@angular/core';
import {beforeEach, beforeEachProviders, ddescribe, describe, fakeAsync, iit, inject, it, tick, xdescribe, xit} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {of } from 'rxjs/observable/of';

import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanDeactivate, DefaultUrlSerializer, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Params, ROUTER_DIRECTIVES, Resolve, Router, RouterConfig, RouterOutletMap, RouterStateSnapshot, RoutesRecognized, UrlSerializer} from '@angular/router';

import {routes} from '../components/app/app.routes';
import {AppWrapper} from '../components/app/appwrapper.component';

export const ROUTER_FAKE_PROVIDERS: any[] = [
     RouterOutletMap,
     {provide: UrlSerializer, useClass: DefaultUrlSerializer},
     {provide: Location, useClass: SpyLocation},
     LocationStrategy,
     {
       provide: Router,
       useFactory: (resolver: ComponentResolver, urlSerializer: UrlSerializer,
                    outletMap: RouterOutletMap, location: Location, injector: Injector) => {
         return new Router(
             AppWrapper, resolver, urlSerializer, outletMap, location, injector, routes);
       },
       deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
     },
     {provide: ActivatedRoute, useFactory: (r: Router) => r.routerState.root, deps: [Router]},
   ];
