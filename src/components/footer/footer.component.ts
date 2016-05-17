import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
  selector: '.plone-footer', // <app></app>
  directives: [],
  template: require('./footer.component.html')
})
export class Footer {
  constructor() { }

}

Registry.registerComponent('plone.footer', Footer);
