import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  selector: 'plone-toolbar',
  styleUrls: ['src/components/toolbar/toolbar.css'],
  template: require('./toolbar.component.html'),
  directives: [
    ...ROUTER_DIRECTIVES
  ]
})
export class Toolbar {
  public links = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.links = [{
      label: 'Edit',
      url: './edit'
    }, {
      label: 'View',
      url: ''
    }]
  }
}
