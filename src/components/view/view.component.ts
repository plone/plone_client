import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams} from '@angular/router-deprecated';
import {Headers} from '@angular/http';
import {Model} from '../../models/document';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {RightColumn} from '../columns/rightcolumn.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {ObjectService} from '../../services/object.service';


@Component({
  selector: 'view',
  directives: [
    TitleTile,
    Header,
    TitleTile,
    Footer,
    Navigation,
    Toolbar,
    Breadcrumbs,
    RightColumn
  ],
  providers: [ObjectService],
  template: require('./view.component.html')
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
  path = '';

  constructor(private objectService: ObjectService, _params: RouteParams) {
    this.path = _params.get('1') || 'front-page';
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
