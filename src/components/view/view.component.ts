import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams} from '@angular/router-deprecated';

@Component({
  selector: 'view',
  directives: [
    TitleTile,
  ],
  template: require('./view.component.html')
})
export class View {
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
