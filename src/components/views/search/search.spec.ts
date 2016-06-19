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

import {Search} from './search.component.ts';

import {LoginService} from '../../../services/login.service.ts';
import {ConfigurationService} from '../../../services/configuration.service';

import {ROUTER_FAKE_PROVIDERS} from '../../../platform/fakerouter';

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
    Search,
    ConfigurationService,
    ROUTER_FAKE_PROVIDERS
  ]);


});
