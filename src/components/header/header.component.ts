import {Component} from '@angular/core';
<<<<<<< HEAD
import {Search} from '../search/search.component';

@Component({
  selector: '.content-header', // <app></app>
  directives: [Search],
=======
import {Logo} from '../logo/logo.component';
import {Search} from '../search/search.component';

@Component({
  selector: 'plone-header', // <app></app>
  directives: [
    Logo,
    Search
  ],
>>>>>>> cba400c... Added breadcrumb & logo components
  template: require('./header.component.html')
})
export class Header {
  constructor() { }

}
