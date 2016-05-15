import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams} from '@angular/router-deprecated';
import {Headers} from '@angular/http';

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
    this.path = _params.get('1') || 'front-page';
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
