import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
  selector: 'plone-breadcrumbs', // <app></app>
  directives: [],
  template: require('./breadcrumbs.component.html')
})
export class Breadcrumbs {
  constructor() { }

}

Registry.registerComponent('plone.breadcrumbs', Breadcrumbs);
