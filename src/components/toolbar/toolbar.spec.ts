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

import {Toolbar} from './toolbar.component.ts';
import {ConfigurationService} from '../../services/configuration.service';
import {ObjectService} from '../../services/object.service';
import {ObjectUtility} from '../../injectors/object';
import {AuthUtils} from '../../injectors/authUtils';

describe('Toolbar Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ObjectService,
        ObjectUtility,
        ConfigurationService,
        AuthUtils,
        Toolbar,
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
  });

  it('toolbar factories and transitions empty', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      let response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          'actions': []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          'history': [
            {
              'action': undefined,
              'actor': 'test_user_1_',
              'comments': '',
              'review_state': 'private',
              'time': '2016-05-19T10:32:40+00:00'
            }
          ],
          'transitions': []
        };
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    expect(toolbar.authenticated).toBe(true);
    let factoriesExpected = [];
    expect(toolbar.factories).toEqual(factoriesExpected);
    let transitionsExpected = [];

    expect(toolbar.transitions).toEqual(transitionsExpected);


  }));
  it('toolbar factories and transitions', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      let response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          'actions': [
            {
              '@id': 'view',
              'category': '',
              'title': 'View'
            },
            {
              '@id': 'edit',
              'category': '',
              'title': 'Edit'
            },
            {
              '@id': 'Collection',
              'category': 'factories',
              'title': 'Collection'
            },
            {
              '@id': 'Document',
              'category': 'factories',
              'title': 'Document'
            },
            {
              '@id': 'reject',
              'category': 'workflow',
              'title': 'Send back'
            }
          ]
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
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
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    expect(toolbar.authenticated).toBe(true);
    let factoriesExpected = [
      {
        '@id': 'Collection',
        'category': 'factories',
        'title': 'Collection',
        'type': 'Collection',
        'uri': '/front-page/!!add?type=Collection'
      }, {
        '@id': 'Document',
        'category': 'factories',
        'title': 'Document',
        'type': 'Document',
        'uri': '/front-page/!!add?type=Document'
      }
    ];
    expect(toolbar.factories).toEqual(factoriesExpected);
    let transitionsExpected = [
      {
        '@id': 'http://localhost:55001/plone/front-page/@workflow/publish',
        'title': 'Publish',
        'name': 'publish'
      }, {
        '@id': 'http://localhost:55001/plone/front-page/@workflow/submit',
        'title': 'Submit for publication',
        'name': 'submit'
      }
    ];

    expect(toolbar.transitions).toEqual(transitionsExpected);
  }));

  it('toolbar active categories', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      let response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          'actions': []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          'history': [
            {
              'action': undefined,
              'actor': 'test_user_1_',
              'comments': '',
              'review_state': 'private',
              'time': '2016-05-19T10:32:40+00:00'
            }
          ],
          'transitions': []
        };
      }
      c.mockRespond(new Response(new ResponseOptions({body: response})));
    });
    authUtils.loggedIn = true;
    authUtils.userInfo = {
      username: 'admin'
    };
    toolbar.ngOnInit();
    toolbar._active = 'anyCategory';
    let active;
    active = toolbar.isActive('anotherCategory');
    expect(active).toBe(false);

    active = toolbar.isActive('anyCategory');
    expect(active).toBe(true);
  }));
  it('toolbar categories toogle()', inject([Toolbar, MockBackend, AuthUtils], (toolbar, backend, authUtils) => {
    backend.connections.subscribe(c => {
      let response;
      if (c.request.url.indexOf('@actions') > -1) {
        response = {
          'actions': []
        };
      } else if (c.request.url.indexOf('workflow') > -1) {
        response = {
          'history': [
            {
              'action': undefined,
              'actor': 'test_user_1_',
              'comments': '',
              'review_state': 'private',
              'time': '2016-05-19T10:32:40+00:00'
            }
          ],
          'transitions': []
        };
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
    expect(toolbar._active).toBe(undefined);

    toolbar.toggle('anyCategory');
    expect(toolbar._active).toEqual('anyCategory');

  }));


});
