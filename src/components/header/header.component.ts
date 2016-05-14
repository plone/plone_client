import {Component} from '@angular/core';
import {Search} from '../search/search.component';

@Component({
  selector: '.content-header', // <app></app>
  directives: [Search],
  template: require('./header.component.html')
})
export class Header {
  constructor() { }

}
