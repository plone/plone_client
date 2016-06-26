import {TestComponentBuilder} from '@angular/compiler/testing';
import {
  Component,
  provide
} from '@angular/core';

import {
 beforeEachProviders,
 describe,
 inject,
 it
} from '@angular/core/testing';

import {App} from './app.component.ts';

import {AuthUtils} from '../../injectors/authUtils';
import {ConfigurationService} from '../../services/configuration.service';



describe('App', () => {
	beforeEachProviders(() => [
		App,
    ConfigurationService,
    AuthUtils
	]);

	it('should log ngOnInit', inject([App], (app) => {
		spyOn(console, 'log');
		expect(console.log).not.toHaveBeenCalled();

		app.ngOnInit();
		expect(console.log).toHaveBeenCalled();
	}));


});
