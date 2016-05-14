import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';

@Component({
  selector: 'edit',
  directives: [
    TitleTile,
  ],
  template: require('./edit.component.html')
})
export class Edit {
  data = {};

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get('/api/home')
      .subscribe(res => {
        this.data = res.json();
      });
  }
}
