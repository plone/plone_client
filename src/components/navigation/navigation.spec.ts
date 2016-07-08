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

import {Location} from '@angular/common';

import {Navigation} from './navigation.component.ts';

import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';

import {ObjectUtility} from '../../injectors/object';

import {SpyLocation} from '@angular/common/testing';

describe('Navigation Component', () => {

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
    ObjectService,
    ObjectUtility,
    ConfigurationService,
    {provide: Location, useClass: SpyLocation},
    Navigation
  ]);
  it('navigation items', inject([Navigation, MockBackend], (navigation, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('@components/navigation');
      let response = [
        {
          'data': {
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
          },
          'id': 'navigation'
        }
      ];
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

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

  }));



});
