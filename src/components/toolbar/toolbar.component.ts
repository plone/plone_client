import {Component} from '@angular/core';

@Component({
  selector: 'plone-toolbar',
  directives: [],
  styleUrls: ['src/components/toolbar/toolbar.css'],
  template: require('./toolbar.component.html')
})
export class Toolbar {
  home = 'localhost:3000';
  edit = '/edit';
  links = [
    {
      'label': 'Add',
      'url': '/++add++Page'
    },
    {
      'label': 'Edit',
      'url': '/edit'
    }
  ];
  constructor() { }
}
