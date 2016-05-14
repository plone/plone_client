import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Routes, Router, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../view/view.component';
import {Edit} from '../edit/edit.component';
import TitleTile from '../title-tile/title-tile.component';


/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app',
  directives: [
    ROUTER_DIRECTIVES,
    Header,
    TitleTile,
    Footer,
    Navigation
  ],
  providers: [ROUTER_PROVIDERS],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@Routes([
  { path: '/**/edit', component: Edit },
  { path: '/*', component: View },
  { path: '*', component: View }
])
export class App {

  constructor(
    private router: Router) {
  }
}
