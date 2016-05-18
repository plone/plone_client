import {Component} from '@angular/core';
import {Logo} from '../logo/logo.component';
import {Search} from '../search/search.component';
import {Registry} from '../app/registry.ts';
import {AuthUtils} from '../../injectors/authUtils';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'plone-header', // <app></app>
  directives: [
    Logo,
    Search,
    ROUTER_DIRECTIVES
  ],
  providers: [
    AuthUtils
  ],
  template: require('./header.component.html')
})
export class Header {
  private showLogin = true;
  constructor(private authUtils: AuthUtils) {
    if( authUtils.isAuthenticated() ) {
      this.showLogin = false;
    }
  }

}

Registry.registerComponent('plone.header', Header);
