import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams, Router} from '@angular/router-deprecated';
import {Model} from '../../models/document';
import {ObjectService} from '../../services/object.service';


@Component({
  selector: 'edit',
  directives: [
    TitleTile,
  ],
  providers: [ObjectService],
  template: require('./edit.component.html')
})
export class Edit {
  model: Model = {
    title: '',
    description: '',
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };
  path = '';

  constructor(private objectService: ObjectService, _params: RouteParams,
              private router: Router) {
    this.path = _params.get('1') || 'front-page';
  }

  ngOnInit() {
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
    });
  }

  onSave() {
    this.objectService.put(this.path, this.model).subscribe(res => {
      this.router.navigateByUrl('/' + this.path);
    });
  }

  onCancel() {
    this.router.navigateByUrl('/' + this.path);
  }
}
