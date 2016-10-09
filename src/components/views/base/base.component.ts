import {Component, Renderer} from '@angular/core';
import {ObjectService} from '../../../services/object.service';
import {Location} from '@angular/common';
import {Model, Summary} from '../../../models/model';
import {ObjectUtility} from '../../../injectors/object';


@Component({
  selector: 'plone-base-view',
  template: require('./base.component.html')
})
export class View {
  model: Model = {
    created: undefined,
    modified: undefined,
    title: '',
    description: '',
    UID: '',
    member: [],
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };
  items = [];
  path = '/front-page';

  constructor(private objectService: ObjectService,
              private location: Location,
              public utility: ObjectUtility) {
  }

  ngOnInit() {
    this.path = this.location.path() || '/front-page';
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
    });
  }

}
