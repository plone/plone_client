import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
  selector: 'plone-search',
  directives: [],
  template: require('./search.component.html')
})
export class Search {
  constructor() { }
}

Registry.registerComponent('plone.search', Search);
