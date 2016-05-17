import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../../title-tile/title-tile.component';
import {ObjectService} from '../../../services/object.service';
import {Location} from '@angular/common';
import {Model, Summary} from '../../../models/model';
import {ObjectUtility} from '../../../injectors/object';
import {ROUTER_DIRECTIVES} from '@angular/router';


@Component({
  selector: 'view',
  directives: [
    TitleTile,
    ...ROUTER_DIRECTIVES
  ],
  providers: [
    ObjectService,
    ObjectUtility
  ],
  template: require('./base.component.html')
})
export class View {
  model: Model = {
    created: null,
    modified: null,
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
