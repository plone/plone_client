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
 it
} from '@angular/core/testing';

import {
  BaseRequestOptions,
  Http
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {ConfigurationService} from './configuration.service';

import {ROUTER_FAKE_PROVIDERS} from '../platform/fakerouter';

describe('Configuration Service', () => {

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
    ConfigurationService,
    ROUTER_FAKE_PROVIDERS
  ]);


});
