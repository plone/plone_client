import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';
import {Location} from '@angular/common';

@Component({
  selector: '.plone-footer',
  template: require('./footer.component.html')
})
export class Footer {
  constructor(private location: Location) {
  }

}

Registry.registerComponent('plone.footer', Footer);
