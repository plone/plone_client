import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Registry} from '../app/registry.ts';
import {ObjectService} from '../../services/object.service';
import {ObjectUtility} from '../../injectors/object';


@Component({
  selector: 'plone-breadcrumbs',
  template: require('./breadcrumbs.component.html')
})
export class Breadcrumbs {
  show = false;
  crumbs = [];

  constructor(
    private objectService: ObjectService,
    private route: ActivatedRoute,
    public utility: ObjectUtility) { }

  ngOnInit() {
    this.route.url.subscribe(() => {
      this.objectService.get(this.utility.getCurrentPath() + '/@components/breadcrumbs').subscribe(res => {
        let data = res.json();
        if (data instanceof Array) {
          data = data[0];
        }
        this.crumbs = data.items;
        if ( this.crumbs.length > 0 ) {

          this.show = true;

          this.crumbs.unshift({
            'title': 'Home',
            'url': '/front-page'
          });
        }
      });
    });
  }
}

Registry.registerComponent('plone.breadcrumbs', Breadcrumbs);
