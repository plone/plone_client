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

import {LoginService} from './login.service.ts';

import {ConfigurationService} from './configuration.service';

import {ROUTER_FAKE_PROVIDERS} from '../platform/fakerouter';

describe('Login Service', () => {

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
    LoginService,
    ConfigurationService,
    LoginService,
    ROUTER_FAKE_PROVIDERS
  ]);


  it('login service has to success', inject([LoginService, MockBackend], (loginService, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      var response = {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8"
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    loginService.login().subscribe(data => {
      var responseReceived = new Response(new ResponseOptions(
        {
          "body": {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8"
          },
          "url": null,
          "status": null,
          "statusText": null,
          "type": null
        }
      ));
      expect(data).toEqual(responseReceived);
    });


  }))

  /*it('login action has to fail', inject([LoginService, MockBackend], (loginService, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      var response = {
        "success": false,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8"
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    expect(loginService.failed).toBe(true);

  }))*/


});
