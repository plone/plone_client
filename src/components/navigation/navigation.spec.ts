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

import {Navigation} from './navigation.component.ts';

import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';

import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';

import {ROUTER_FAKE_PROVIDERS} from '../../platform/fakerouter';

describe('Navigation Component', () => {

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
    Navigation,
    ROUTER_FAKE_PROVIDERS,
    ObjectService,
    ConfigurationService,
    ObjectUtility
  ]);
  it('navigation items', inject([Navigation, MockBackend], (navigation, backend) => {
    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('@components/navigation');
      var response = [
        {
          "data": {
            "items": [
              {
                "title":"Home",
                "url":"http://castanyera.iskra.cat:8070/Plone"
              }, {
                "title":"News",
                "url":"http://castanyera.iskra.cat:8070/Plone/news"
              }, {
                "title":"Events",
                "url":"http://castanyera.iskra.cat:8070/Plone/events"
              }, {
                "title":"Users",
                "url":"http://castanyera.iskra.cat:8070/Plone/Members"
              }, {
                "title":"Something interesting here",
                "url":"http://castanyera.iskra.cat:8070/Plone/junk"
              }, {
                "title":"Another page",
                "url":"http://castanyera.iskra.cat:8070/Plone/sdfklsd-flds-j"
              }
            ]
          },
          "id":"navigation"
        }
      ]
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    navigation.ngOnInit();
    var items = [
      {
        "title":"Home",
        "url":"http://castanyera.iskra.cat:8070/Plone"
      }, {
        "title":"News",
        "url":"http://castanyera.iskra.cat:8070/Plone/news"
      }, {
        "title":"Events",
        "url":"http://castanyera.iskra.cat:8070/Plone/events"
      }, {
        "title":"Users",
        "url":"http://castanyera.iskra.cat:8070/Plone/Members"
      }, {
        "title":"Something interesting here",
        "url":"http://castanyera.iskra.cat:8070/Plone/junk"
      }, {
        "title":"Another page",
        "url":"http://castanyera.iskra.cat:8070/Plone/sdfklsd-flds-j"
      }
    ]
    expect(navigation.items).toEqual(items);

  }));



});
