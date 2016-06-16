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

import {Location} from '@angular/common';

import {Breadcrumbs} from './breadcrumbs.component.ts';

import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';

import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';


describe('Breadcrumbs Component', () => {

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

    Breadcrumbs,
    ObjectService,
    Location,
    ObjectUtility,
    ConfigurationService
  ]);

  it('breadcrumbs has to return data with home', inject([Breadcrumbs, MockBackend], (bread, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('.@components/breadcrumbs');
      var response = [{
        'data': {
          'items': [{
            'title': 'anyTitle',
            'url': 'anyUrl'
          }]
        }
      }];
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

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

  }))


});
