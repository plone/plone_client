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

import {RightColumn} from './rightcolumn.component.ts';

import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';

import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';

import {ROUTER_FAKE_PROVIDERS} from '../../platform/fakerouter';

import {PloneComponent} from '../plonecomponent/plonecomponent.component';

describe('Rightcolumn Component', () => {

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

    RightColumn,
    ROUTER_FAKE_PROVIDERS
  ]);
  it('right column components initial', inject([RightColumn, MockBackend], (rightColumn, backend) => {

    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('@components/navigation');
      var response;
      if (c.request.url.indexOf() > -1) {
        response = []
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    rightColumn.ngOnInit();
    var components;
    components = [];
    expect(rightColumn.components).toEqual(components);

    rightColumn.updateComponents('anyEvent');
    components = [
      {
        "obj": new PloneComponent(),
        "name": "anyEvent"
      }
    ];
    expect(rightColumn.components).toEqual(components);


  }));
  it('right column components event', inject([RightColumn, MockBackend], (rightColumn, backend) => {

    backend.connections.subscribe(c => {
      expect(c.request.url).toMatch('@components/navigation');
      var response;
      if (c.request.url.indexOf() > -1) {
        response = []
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });

    rightColumn.ngOnInit();
    var components;

    rightColumn.updateComponents('anyEvent');
    components = [
      {
        "obj": new PloneComponent(),
        "name": "anyEvent"
      }
    ];
    expect(rightColumn.components).toEqual(components);


  }));


});
