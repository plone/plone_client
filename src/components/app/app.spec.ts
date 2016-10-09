import { inject, TestBed } from '@angular/core/testing';

import {App} from './app.component.ts';
import {AuthUtils} from '../../injectors/authUtils';
import {ConfigurationService} from '../../services/configuration.service';

describe('App', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        App,
        ConfigurationService,
        AuthUtils
      ]
    });
  });

  it('should log ngOnInit', inject([App], (app) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    app.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));


});
