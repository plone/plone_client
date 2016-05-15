import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import {
 beforeEachProviders,
 describe,
 inject,
 injectAsync,
 it
} from '@angular/core/testing';

import { App } from './app.component.ts';

describe('App', () => {
	beforeEachProviders(() => [
		App
	]);

	it('should log ngOnInit', inject([App], (app) => {
		spyOn(console, 'log');
		expect(console.log).not.toHaveBeenCalled();

		app.ngOnInit();
		expect(console.log).toHaveBeenCalled();
	}));
});
