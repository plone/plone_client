import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'plone-toolbar',
  styleUrls: ['src/components/toolbar/toolbar.css'],
  template: require('./toolbar.component.html'),
  directives: [
    ...ROUTER_DIRECTIVES,
  ]
})
export class Toolbar {
  links = [];

  constructor(private router: Router) {
    this.links = [{
      label: 'Edit',
      url: './edit'
    }, {
      label: 'View',
      url: ''
    }]
  }
}
