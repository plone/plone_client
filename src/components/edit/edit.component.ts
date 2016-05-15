import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
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
    var url = 'http://castanyera.iskra.cat:8070/' + this.path;
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    this.http.get(url, {
      headers: headers
    }).subscribe(res => {
      this.data = res.json();
    });
  }
}
