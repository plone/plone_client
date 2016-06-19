import {TestComponentBuilder} from '@angular/compiler/testing';

import {
  Component,
  provide,
  Injector,
  ReflectiveInjector
} from '@angular/core';

import {
 beforeEachProviders,
 describe,
 inject,
 injectAsync,
 it
} from '@angular/core/testing';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {Login} from './login.component.ts';

import {LoginService} from '../../../services/login.service.ts';
import {ConfigurationService} from '../../../services/configuration.service';

import {Router} from '@angular/router';
//import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';

import { ComponentResolver } from '@angular/core';
import { UrlSerializer, RouterOutletMap, DefaultUrlSerializer } from '@angular/router';

import { SpyLocation } from '@angular/common/testing';

describe('Login Component', () => {

  let injector;
  let backend;
  let bread;
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
    Login,
    ConfigurationService,
    LoginService,
    RouterOutletMap,
    {provide: UrlSerializer, useClass: DefaultUrlSerializer},
    {provide: Location, useClass: SpyLocation},
    {
        provide: Router,
        useFactory: (resolver:ComponentResolver, urlSerializer:UrlSerializer, outletMap:RouterOutletMap, location:Location, injector:Injector) => {
          const r = new Router(RootCmp, resolver, urlSerializer, outletMap, location, injector, config);
          r.initialNavigation();
          return r;
        },
        deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
      },
    //ROUTER_FAKE_PROVIDERS
  ]);


  it('login action has to success', inject([Login, MockBackend], (login, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      var response = {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8"
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    login.onLogin();
    expect(login.failed).toBe(false);

  }))

  it('login action has to fail', inject([Login, MockBackend], (login, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      var response = {
        "success": false,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8"
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    login.password = 'admin';
    login.onLogin();
    expect(login.failed).toBe(true);

  }))


});
