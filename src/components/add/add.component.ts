import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams, Router} from '@angular/router-deprecated';
import {Model} from '../../models/document';
import {ObjectService} from '../../services/object.service';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {RightColumn} from '../columns/rightcolumn.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';


@Component({
  selector: 'edit',
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
  template: require('./add.component.html')
})
export class Add {
  model: Model = {
    title: '',
    description: ''
  };
  path = '';

  constructor(private objectService: ObjectService, _params: RouteParams,
              private router: Router) {
  }

  onAdd() {
    this.model['@context'] = '/@@context.jsonld';
    // until we figure out routing...
    let path = window.location.pathname.replace('/add', '');
    this.model['@type'] = window.location.search.replace('?type=', '');
    this.objectService.create(path, this.model).subscribe(res => {
      this.router.navigateByUrl(path);
    });
  }

  onCancel() {
    this.router.navigateByUrl(this.path);
  }
}
