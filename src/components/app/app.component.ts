import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
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
    ...ROUTER_DIRECTIVES,
    Header,
    TitleTile,
    Footer,
    Navigation
  ],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@RouteConfig([
  { regex: '(.*)/edit', serializer: () => '', component: Edit, name: 'Edit' },
  { regex: '(.*)', serializer: () => '', component: View, name: 'View' },
])
export class App {
}
