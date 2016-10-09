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

import {View} from './base.component.ts';
import {LoginService} from '../../../services/login.service.ts';
import {ConfigurationService} from '../../../services/configuration.service';
import {ObjectService} from '../../../services/object.service.ts';
import {ObjectUtility} from '../../../injectors/object';
import { TitleTile } from '../../title-tile/title-tile.component';

describe('View Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        View,
        TitleTile
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
    this.fixture = TestBed.createComponent(View)
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      '@id': 'http://castanyera.iskra.cat:8070/Plone/front-page',
      '@type': 'Document',
      'UID': '7e019104059740d89b5929612282c12a',
      'allow_discussion': undefined,
      'changeNote': '',
      'contributors': [],
      'created': '2016-05-14T13:57:16+00:00',
      'creators': [
        'admin'
      ],
      'description': 'LALALAALAL',
      'effective': '2016-05-15T13:08:00',
      'exclude_from_nav': false,
      'expires': '2016-05-15T13:08:00',
      'id': 'front-page',
      'language': 'en-us',
      'modified': '2016-05-28T14:56:18+00:00',
      'parent': {
        '@id': 'http://castanyera.iskra.cat:8070/Plone',
        '@type': 'Plone Site',
        'description': '',
        'title': 'Site'
      },
      'relatedItems': [],
      'rights': '',
      'subjects': [],
      'table_of_contents': undefined,
      'text': {
        'content-type': 'text/html',
        'data': '<p>foobar 5</p>',
        'encoding': 'utf8'
      },
      'title': 'Another thing67'
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('view component model attribute', () => {
    let view = this.fixture.componentInstance;
    view.ngOnInit();
    let responseJSON = {
       '@id': 'http://castanyera.iskra.cat:8070/Plone/front-page',
       '@type': 'Document',
       'UID': '7e019104059740d89b5929612282c12a',
       'allow_discussion': undefined,
       'changeNote': '',
       'contributors': [

       ],
       'created': '2016-05-14T13:57:16+00:00',
       'creators': [
          'admin'
       ],
       'description': 'LALALAALAL',
       'effective': '2016-05-15T13:08:00',
       'exclude_from_nav': false,
       'expires': '2016-05-15T13:08:00',
       'id': 'front-page',
       'language': 'en-us',
       'modified': '2016-05-28T14:56:18+00:00',
       'parent':
       {
          '@id': 'http://castanyera.iskra.cat:8070/Plone',
          '@type': 'Plone Site',
          'description': '',
          'title': 'Site'
       },
       'relatedItems': [

       ],
       'rights': '',
       'subjects': [

       ],
       'table_of_contents': undefined,
       'text':
       {
          'content-type': 'text/html',
          'data': '<p>foobar 5</p>',
          'encoding': 'utf8'
       },
       'title': 'Another thing67'
    };
    expect(view.model).toEqual(responseJSON);
  });

});
