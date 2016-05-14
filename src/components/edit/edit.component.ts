import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams} from '@angular/router-deprecated';

@Component({
  selector: 'edit',
  directives: [
    TitleTile,
  ],
  template: require('./edit.component.html')
})
export class Edit {
  data = {};
  path = '';

  constructor(public http: Http, _params: RouteParams) {
    this.path = _params.get('1');
  }

  ngOnInit() {
    this.http.get(`/api/${this.path}`)
      .subscribe(res => {
        this.data = res.json();
      });
  }
}
