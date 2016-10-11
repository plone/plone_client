import { inject, TestBed } from '@angular/core/testing';

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
import {AuthUtils} from '../injectors/authUtils.ts';
import {ConfigurationService} from './configuration.service';

describe('Login Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        AuthUtils,
        ConfigurationService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });


  it('login service has to success', inject([LoginService, MockBackend], (loginService, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      let response = {
        'success': true,
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8'
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    loginService.login();
    loginService.authUtils.isAuthenticated.subscribe(authenticated => {
      expect(authenticated).toBe(true);
    });


  }));

  /*it('login action has to fail', inject([LoginService, MockBackend], (loginService, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@login');
      var response = {
        'success': false,
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8'
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    expect(loginService.failed).toBe(true);

  }))*/


});
