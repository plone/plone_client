import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';
import {AuthUtils} from '../../injectors/authUtils';

@Component({
  selector: 'plone-header', // <app></app>,
  template: require('./header.component.html')
})
export class Header {
  private showLogin = true;
  constructor(private authUtils: AuthUtils) {
    if ( authUtils.isAuthenticated() ) {
      this.showLogin = false;
    }
  }

}

Registry.registerComponent('plone.header', Header);
