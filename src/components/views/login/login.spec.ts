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
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule }   from '@angular/forms';

import {Login} from './login.component.ts';
import {LoginService} from '../../../services/login.service.ts';
import {ConfigurationService} from '../../../services/configuration.service';

describe('Login Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        Login
      ],
      providers: [
        ConfigurationService,
        LoginService,
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
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    this.fixture = TestBed.createComponent(Login);
  });

  it('login action has to success', inject([MockBackend], (backend: MockBackend) => {
    let response = {
      'success': true,
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJGb28gYmFyIiwiZXhwaXJlcyI6MTQ2NjE0MDA2Ni42MzQ5ODYsInR5cGUiOiJKV1QiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.D9EL5A9xD1z3E_HPecXA-Ee7kKlljYvpDtan69KHwZ8'
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
    
    let login = this.fixture.componentInstance;
    login.onLogin();
    expect(login.failed).toBe(false);
  }));

  it('login action has to fail', inject([MockBackend], (backend: MockBackend) => {
    let response = {
      'success': false
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
    
    let login = this.fixture.componentInstance;
    login.password = 'admin';
    login.onLogin();
    expect(login.failed).toBe(true);

  }));

});
