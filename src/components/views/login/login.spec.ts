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
import {ROUTER_FAKE_PROVIDERS} from '../../../platform/fakerouter';

describe('Login Component', () => {

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
    ROUTER_FAKE_PROVIDERS,
    ConfigurationService,
    LoginService,
    Login,
  ]);

  it('login action has to success', inject([Login, MockBackend], (login, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      let response = {
        'success': true,
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8'
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    login.onLogin();
    expect(login.failed).toBe(false);

  }));

  it('login action has to fail', inject([Login, MockBackend], (login, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      let response = {
        'success': false,
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8'
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    login.password = 'admin';
    login.onLogin();
    expect(login.failed).toBe(true);

  }));


});
