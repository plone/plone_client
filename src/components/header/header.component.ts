import {Component} from '@angular/core';
import {Logo} from '../logo/logo.component';
import {Search} from '../search/search.component';

@Component({
  selector: 'plone-header', // <app></app>
  directives: [
    Logo,
    Search
  ],
  template: require('./header.component.html')
})
export class Header {
  constructor() { }

}
