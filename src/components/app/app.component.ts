import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Footer} from '../footer/footer.component';
import {View} from '../view/view.component';
import TitleTile from '../title-tile/title-tile.component';


/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
    Header,
    TitleTile,
    Footer
  ],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@RouteConfig([
//  { path: '/**/edit', component: Edit, name: 'Edit' }
  { path: '/**', component: View, name: 'View' }
])
export class App {
}
