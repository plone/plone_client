import {Component} from '@angular/core';
import {ObjectService} from '../../services/object.service';
import {Registry} from '../app/registry.ts';
import {ObjectUtility} from '../../injectors/object';


@Component({
  selector: 'plone-navigation',
  template: require('./navigation.component.html')
})
export class Navigation {
  items = [];

  constructor(private objectService: ObjectService,
              public utility: ObjectUtility) { }

  ngOnInit() {
    this.objectService.get(this.utility.getCurrentPath() + '/@components/navigation').subscribe(res => {
      let data = res.json();
      if (data instanceof Array) {
        data = data[0];
      }
      this.items = data.items;
    });
  }

}

Registry.registerComponent('plone.navigation', Navigation);
