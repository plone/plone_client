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

import {ObjectService} from './object.service.ts';

import {ConfigurationService} from './configuration.service';

import {ROUTER_FAKE_PROVIDERS} from '../platform/fakerouter';

describe('Object Service', () => {

  let injector;

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
    ConfigurationService,
    ROUTER_FAKE_PROVIDERS
  ]);


  it('object service getWorkflow data', inject([ObjectService, MockBackend], (objectService, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('workflow');
        let response = {
          'history': [
            {
              'action': undefined,
              'actor': 'test_user_1_',
              'comments': '',
              'review_state': 'private',
              'time': '2016-05-19T10:32:40+00:00'
            }
          ],
          'transitions': [
            {
              '@id': 'http://localhost:55001/plone/front-page/@workflow/publish',
              'title': 'Publish'
            },
            {
              '@id': 'http://localhost:55001/plone/front-page/@workflow/submit',
              'title': 'Submit for publication'
            }
          ]
        };

      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    objectService.getWorkflow().subscribe(data => {
      let responseReceived = new Response(new ResponseOptions(
        {
          'body': {
            'history': [
              {
                'action': undefined,
                'actor': 'test_user_1_',
                'comments': '',
                'review_state': 'private',
                'time': '2016-05-19T10:32:40+00:00'
              }
            ],
            'transitions': [
              {
                '@id': 'http://localhost:55001/plone/front-page/@workflow/publish',
                'title': 'Publish'
              },
              {
                '@id': 'http://localhost:55001/plone/front-page/@workflow/submit',
                'title': 'Submit for publication'
              }
            ]
          },
          'url': undefined,
          'status': undefined,
          'statusText': undefined,
          'type': undefined
        }
      ));
      expect(data).toEqual(responseReceived);

    });


  }));



});
