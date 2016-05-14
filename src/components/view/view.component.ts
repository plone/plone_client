import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';

@Component({
  selector: 'view',
  directives: [
    TitleTile,
  ],
  template: require('./view.component.html')
})
export class View {
  data = {};

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get('/api/home')
      .subscribe(res => {
        this.data = res.json();
      });
  }
}
