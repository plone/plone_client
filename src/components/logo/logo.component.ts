import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
  selector: 'plone-logo', // <app></app>
  template: require('./logo.component.html')
})
export class Logo {
  constructor() { }

}

Registry.registerComponent('plone.logo', Logo);
