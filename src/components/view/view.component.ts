import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {Headers} from '@angular/http';
import {Model} from '../../models/document';
import {Location} from '@angular/common/src/location';

@Component({
  selector: 'view',
  directives: [
    TitleTile,
  ],
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
  path = '';

  constructor(public http: Http, public location: Location) {
    this.path = 'front-page';
    debugger;
  }

  ngOnInit() {
    var url = 'http://castanyera.iskra.cat:8070/' + this.path;
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    this.http.get(url, {
      headers: headers
    }).subscribe(res => {
      this.model = res.json();
    });
  }

}
