import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';
import {Registry} from '../app/registry.ts';
import {Action} from '../../models/action';
import {ObjectService} from '../../services/object.service';

@Component({
  selector: 'plone-toolbar',
  styleUrls: ['src/components/toolbar/toolbar.css'],
  template: require('./toolbar.component.html'),
  providers: [ObjectService],
  directives: [
    ...ROUTER_DIRECTIVES,
  ]
})
export class Toolbar {
  actions: Action[] = [];
  factories: Action[] = [];
  workflow: Action[] = [];

  path = '';
  object_path = '';
  folder_path = '';
  private _active = null;

  constructor(private router: Router, private location: Location,
              private objectService: ObjectService) {
  }

  ngOnInit(){
    this.path = this.location.path() || '/front-page';
    this.path = this.path.split('/@@')[0];
    this.object_path = this.path;
    this.folder_path = this.path;
    if(this.object_path === '/'){
      // default page is front page...
      this.object_path = '/front-page';
    }

    this.actions = [{
      title: 'View',
      uri: this.object_path,
      category: 'view'
    }, {
      title: 'Edit',
      uri: this.object_path + '/@@edit',
      category: 'edit'
    }];

    this.objectService.actions(this.object_path).subscribe(res => {
      var actions: Action[] = res.json().actions;
      actions.forEach(action => {
        if(action.category !== 'factories'){
          return;
        }
        // only care about content type
        var type = action['@id'];
        action.type = type;
        action.uri = this.object_path + '/@@add?type=' + type;
        this.factories.push(action);
      });
    });
  }

  isActive(category: string){
    return this._active === category;
  }

  toggle(category: string){
    if(this._active === category){
      this._active = null;
    }else{
      this._active = category;
    }
  }
}

Registry.registerComponent('plone.toolbar', Toolbar);
