import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';
import {Registry} from '../app/registry.ts';

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
  path = '';
  object_path = '';
  folder_path = '';

  constructor(private router: Router, private location: Location) {
    this.path = this.location.path() || 'front-page';
    this.path = this.path.split('/@@')[0];
    this.object_path = this.path;
    this.folder_path = this.path;
    if(this.object_path === '/'){
      // default page is front page...
      this.object_path = '/front-page';
    }
    this.links = [{
      label: 'Edit',
      url: this.object_path + '/@@edit'
    }, {
      label: 'View',
      url: this.object_path
    }, {
      label: 'Add page',
      url: this.object_path + '/@@add?type=Document'
    }, {
      label: 'Add folder',
      url: this.object_path + '/@@add?type=Folder'
    }];
  }
}

Registry.registerComponent('plone.toolbar', Toolbar);
