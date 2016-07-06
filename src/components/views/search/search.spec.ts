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

import {Search} from './search.component.ts';

import {ConfigurationService} from '../../../services/configuration.service';
import {SearchService} from '../../../services/search.service.ts';

import {ROUTER_FAKE_PROVIDERS} from '../../../platform/fakerouter';

import {ObjectUtility} from '../../../injectors/object';

describe('Search Component', () => {

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
    SearchService,
    ObjectUtility,
    ConfigurationService,
    ROUTER_FAKE_PROVIDERS
  ]);

  it('search action with no query', inject([Search, MockBackend], (search, backend) => {
    backend.connections.subscribe(c => {
      throw {
        name: 'Error',
        message: 'When no query, Search Component should not do any request'
      };
    });

    search.q = '';
    search.search();
    expect(search.resultsQ).toEqual('');

    let searchItems = [];
    expect(search.results).toEqual([]);

  }));

  it('search action with no data', inject([Search, MockBackend], (search, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@search');
      let response = {
        '@id': 'http://localhost:8080/Plone/@search?SearchableText=Plone',
        'items': [],
        'items_total': 0
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    search.q = 'Plone';
    search.search();
    expect(search.resultsQ).toEqual('Plone');

    let searchItems = [];
    expect(search.results).toEqual(searchItems);

  }));

  it('search action with data', inject([Search, MockBackend], (search, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@search');
      let response = {
        '@id': 'http://localhost:8080/Plone/@search?SearchableText=Plone',
        'items': [
          {
            '@id': 'http://localhost:8080/Plone/front-page',
            '@type': 'Document',
            'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
            'title': 'Benvinguts a Plone'
          }
        ],
        'items_total': 1
      };
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    search.q = 'Plone';
    search.search();
    expect(search.resultsQ).toEqual('Plone');

    let searchItems = [
      {
        '@id': 'http://localhost:8080/Plone/front-page',
        '@type': 'Document',
        'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
        'title': 'Benvinguts a Plone'
      }
    ];
    expect(search.results).toEqual(searchItems);

  }));

  it('search action with data sorted alphabetically', inject([Search, MockBackend], (search, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@search');
      let response;
      if (c.request.url.indexOf('&sort_on=sortable_title') > -1) {
        response = {
          '@id': 'http://localhost:8080/Plone/@search?SearchableText=Plone',
          'items': [
            {
              '@id': 'http://localhost:8080/Plone/front-page',
              '@type': 'Document',
              'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
              'title': 'Benvinguts a Plone'
            },
            {
              '@id': 'http://localhost:8080/Plone/front-page',
              '@type': 'Document',
              'description': 'Congratulations! You have installed Plone successfully.',
              'title': 'Welcome to Plone'
            }
          ],
          'items_total': 2
        };
      } else {
        response = {
          '@id': 'http://localhost:8080/Plone/@search?SearchableText=Plone',
          'items': [
            {
              '@id': 'http://localhost:8080/Plone/front-page',
              '@type': 'Document',
              'description': 'Congratulations! You have installed Plone successfully.',
              'title': 'Welcome to Plone'
            },
            {
              '@id': 'http://localhost:8080/Plone/front-page',
              '@type': 'Document',
              'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
              'title': 'Benvinguts a Plone'
            }
          ],
          'items_total': 2
        };
      }

      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    search.q = 'Plone';
    search.search();
    expect(search.resultsQ).toEqual('Plone');

    let searchItems = [
      {
        '@id': 'http://localhost:8080/Plone/front-page',
        '@type': 'Document',
        'description': 'Congratulations! You have installed Plone successfully.',
        'title': 'Welcome to Plone'
      },
      {
        '@id': 'http://localhost:8080/Plone/front-page',
        '@type': 'Document',
        'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
        'title': 'Benvinguts a Plone'
      }
    ];
    expect(search.results).toEqual(searchItems);

    search.sortBy('sortable_title', false);

    let searchItemsSorted = [
      {
        '@id': 'http://localhost:8080/Plone/front-page',
        '@type': 'Document',
        'description': 'Felicitats! Heu instal·lat Plone satisfactòriament.',
        'title': 'Benvinguts a Plone'
      },
      {
        '@id': 'http://localhost:8080/Plone/front-page',
        '@type': 'Document',
        'description': 'Congratulations! You have installed Plone successfully.',
        'title': 'Welcome to Plone'
      }
    ];
    expect(search.results).toEqual(searchItemsSorted);


  }));

});
