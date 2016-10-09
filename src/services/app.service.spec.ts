import { inject, TestBed } from '@angular/core/testing';

import {AppState} from './app.service';
import {ConfigurationService} from './configuration.service';

describe('Configuration Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppState,
        ConfigurationService
      ],
    });
  });


});
