import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../../title-tile/title-tile.component';
import {ObjectService} from '../../../services/object.service';
import {Location} from '@angular/common';
import {Model} from '../../../models/model';


@Component({
  selector: 'view',
  directives: [
    TitleTile
  ],
  providers: [ObjectService],
  template: require('./base.component.html')
})
export class View {
  model: Model = {
    title: '',
    description: '',
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };
  items = [];
  path = 'front-page';

  constructor(private objectService: ObjectService,
              private location: Location) {
    this.path = this.location.path() || 'front-page';
  }

  ngOnInit() {
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
      if(this.model['@type'] === 'Folder'){
        // get listing
        this.objectService.list(this.path).subscribe(res => {
          this.items = res.json()['member'];
        });
      }
    });
  }

}
