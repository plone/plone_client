import {Component} from '@angular/core';
import {Registry} from '../app/registry.ts';
import {ObjectService} from '../../services/object.service';

@Component({
  selector: 'plone-breadcrumbs', // <app></app>
  directives: [],
  providers: [ObjectService],
  template: require('./breadcrumbs.component.html')
})
export class Breadcrumbs {
  objectService: ObjectService;
  show = false;
  crumbs = [];

  constructor(objectService: ObjectService) {
    this.objectService = objectService;
  }

  ngOnInit() {
    this.objectService.get('/components_/breadcrumbs').subscribe(res => {

      var data = res.json();
      if(data instanceof Array){
        data = data[0];
      }
      this.crumbs = res.json().data.items;
      if( this.crumbs.length > 0 ) {

        this.show = true;

        this.crumbs.unshift({
          'title': 'Home',
          'url': '/front-page'
        });
      }
    });
  }
}

Registry.registerComponent('plone.breadcrumbs', Breadcrumbs);
