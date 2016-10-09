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

import {Breadcrumbs} from './breadcrumbs.component.ts';
import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';
import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';

describe('Breadcrumbs Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        Breadcrumbs
      ],
      providers: [
        ObjectService,
        ObjectUtility,
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
      imports: [RouterTestingModule]
    });
    this.fixture = TestBed.createComponent(Breadcrumbs);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = [{
      'items': [{
        'title': 'anyTitle',
        'url': 'anyUrl'
      }]
    }];
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('breadcrumbs has to return data with home', () => {
    let bread = this.fixture.componentInstance;
    bread.ngOnInit();
    expect(bread.crumbs).toEqual(
      [
        {
          title: 'Home',
          url: '/front-page'
        },
        {
          'title': 'anyTitle',
          'url': 'anyUrl'
        }
      ]
    );
    expect(bread.show).toEqual(true);
    
  });


});
