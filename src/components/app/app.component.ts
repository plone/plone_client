import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GeneratedUrl} from '@angular/router-deprecated/src/rules/route_paths/route_path';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../view/view.component';
import {Edit} from '../edit/edit.component';
import TitleTile from '../title-tile/title-tile.component';


let regexSerializer = (params) => new GeneratedUrl('', {});

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'plone-app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
    Header,
    TitleTile,
    Footer,
    Navigation,
    Toolbar,
    Breadcrumbs
  ],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@RouteConfig([
  { regex: '(.*)/edit', serializer: regexSerializer, component: Edit, name: 'Edit' },
  { regex: '(.*)', serializer: regexSerializer, component: View, name: 'View' },
])
export class App {
  constructor() {

  }

  ngOnInit() {
    console.log('Initializing the component App. This is for karma test.');
  }

}
