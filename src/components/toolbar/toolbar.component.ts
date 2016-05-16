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
  path = '';
  object_path = '';
  folder_path = '';

  constructor(_params: RouteParams) {
    this.path = '/' + _params.get('1') || '';
    this.object_path = this.path;
    this.folder_path = this.path;
    if(this.object_path === '/'){
      // default page is front page...
      this.object_path = '/front-page';
    }
    this.links = [{
      label: 'Edit',
      url: this.object_path + '/edit'
    }, {
      label: 'View',
      url: this.object_path
    }, {
      label: 'Add page',
      url: this.object_path + '/add?type=Document'
    }, {
      label: 'Add folder',
      url: this.object_path + '/add?type=Folder'
    }];
  }
}
