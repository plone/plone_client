import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {Router} from '@angular/router';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from '@angular/router';

@Component({
  selector: 'view',
  directives: [
    TitleTile
  ],
  template: require('./view.component.html')
})
export class View implements OnActivate {
  data = {};
  path = '';

  constructor(public http: Http,
              private router: Router) {
  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
  }

  ngOnInit() {
    // var url = 'http://castanyera.iskra.cat:8070' + window.location
    this.http.get(`/api/${this.path}`)
      .subscribe(res => {
        this.data = res.json();
      });
  }
}
