import {Component} from '@angular/core';
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

      this.crumbs = res.json().data.items;
      if( this.crumbs.length > 0 ) {

        this.show = true;

        this.crumbs.unshift({
          'label': 'Home',
          'uri': '/front-page'
        });
      }
    });
  }
}
