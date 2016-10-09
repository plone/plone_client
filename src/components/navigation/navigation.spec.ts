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

import {Navigation} from './navigation.component.ts';
import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';
import {ObjectUtility} from '../../injectors/object';

describe('Navigation Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        Navigation,
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
    this.fixture = TestBed.createComponent(Navigation);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = [{
      'items': [
        {
          'title': 'Home',
          'url': 'http://localhost:3000/Plone'
        }, {
          'title': 'News',
          'url': 'http://localhost:3000/Plone/news'
        }, {
          'title': 'Events',
          'url': 'http://localhost:3000/Plone/events'
        }, {
          'title': 'Users',
          'url': 'http://localhost:3000/Plone/Members'
        }, {
          'title': 'Something interesting here',
          'url': 'http://localhost:3000/Plone/junk'
        }, {
          'title': 'Another page',
          'url': 'http://localhost:3000/Plone/sdfklsd-flds-j'
        }
      ]
    }];
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('navigation items', () => {
    let navigation = this.fixture.componentInstance;
    navigation.ngOnInit();
    let items = [
      {
        'title': 'Home',
        'url': 'http://localhost:3000/Plone'
      }, {
        'title': 'News',
        'url': 'http://localhost:3000/Plone/news'
      }, {
        'title': 'Events',
        'url': 'http://localhost:3000/Plone/events'
      }, {
        'title': 'Users',
        'url': 'http://localhost:3000/Plone/Members'
      }, {
        'title': 'Something interesting here',
        'url': 'http://localhost:3000/Plone/junk'
      }, {
        'title': 'Another page',
        'url': 'http://localhost:3000/Plone/sdfklsd-flds-j'
      }
    ];
    expect(navigation.items).toEqual(items);

  });

});
