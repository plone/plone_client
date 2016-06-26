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

import {Toolbar} from './toolbar.component.ts';

import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';

import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';

import {ROUTER_FAKE_PROVIDERS} from '../../platform/fakerouter';

describe('Toolbar Component', () => {

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

    Toolbar,
    ROUTER_FAKE_PROVIDERS,
    ObjectService,
    ConfigurationService,
    AuthUtils
  ]);
  it('toolbar factories and transitions empty', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      var response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          "actions": []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          "history": [
            {
              "action": null,
              "actor": "test_user_1_",
              "comments": "",
              "review_state": "private",
              "time": "2016-05-19T10:32:40+00:00"
            }
          ],
          "transitions": []
        }
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    expect(toolbar.authenticated).toBe(true);
    var factoriesExpected = [];
    expect(toolbar.factories).toEqual(factoriesExpected);
    var transitionsExpected = [];

    expect(toolbar.transitions).toEqual(transitionsExpected);


  }));
  it('toolbar factories and transitions', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      var response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          "actions": [
            {
              "@id": "view",
              "category": "",
              "title": "View"
            },
            {
              "@id": "edit",
              "category": "",
              "title": "Edit"
            },
            {
              "@id": "Collection",
              "category": "factories",
              "title": "Collection"
            },
            {
              "@id": "Document",
              "category": "factories",
              "title": "Document"
            },
            {
              "@id": "reject",
              "category": "workflow",
              "title": "Send back"
            }
          ]
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          "history": [
            {
              "action": null,
              "actor": "test_user_1_",
              "comments": "",
              "review_state": "private",
              "time": "2016-05-19T10:32:40+00:00"
            }
          ],
          "transitions": [
            {
              "@id": "http://localhost:55001/plone/front-page/@workflow/publish",
              "title": "Publish"
            },
            {
              "@id": "http://localhost:55001/plone/front-page/@workflow/submit",
              "title": "Submit for publication"
            }
          ]
        }
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    expect(toolbar.authenticated).toBe(true);
    var factoriesExpected = [
      {
        "@id": "Collection",
        "category": "factories",
        "title": "Collection",
        "type": "Collection",
        "uri": "/front-page/@@add?type=Collection"
      }, {
        "@id": "Document",
        "category": "factories",
        "title": "Document",
        "type": "Document",
        "uri": "/front-page/@@add?type=Document"
      }
    ]
    expect(toolbar.factories).toEqual(factoriesExpected);
    var transitionsExpected = [
      {
        "@id": "http://localhost:55001/plone/front-page/@workflow/publish",
        "title": "Publish",
        "name": "publish"
      }, {
        "@id": "http://localhost:55001/plone/front-page/@workflow/submit",
        "title": "Submit for publication",
        "name": "submit"
      }
    ];

    expect(toolbar.transitions).toEqual(transitionsExpected);
  }));

  it('toolbar active categories', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      var response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          "actions": []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          "history": [
            {
              "action": null,
              "actor": "test_user_1_",
              "comments": "",
              "review_state": "private",
              "time": "2016-05-19T10:32:40+00:00"
            }
          ],
          "transitions": []
        }
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    toolbar._active = 'anyCategory';
    var active;
    active = toolbar.isActive('anotherCategory');
    expect(active).toBe(false);

    active = toolbar.isActive('anyCategory');
    expect(active).toBe(true);
  }));
  it('toolbar categories toogle()', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      var response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          "actions": []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          "history": [
            {
              "action": null,
              "actor": "test_user_1_",
              "comments": "",
              "review_state": "private",
              "time": "2016-05-19T10:32:40+00:00"
            }
          ],
          "transitions": []
        }
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    toolbar._active = 'anyCategory';

    toolbar.toggle('anyCategory');
    expect(toolbar._active).toBe(null);

    toolbar.toggle('anyCategory');
    expect(toolbar._active).toEqual('anyCategory');

  }));


});
