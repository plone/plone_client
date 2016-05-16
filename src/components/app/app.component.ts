import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from '@angular/router';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../view/view.component';
import {Edit} from '../edit/edit.component';
import TitleTile from '../title-tile/title-tile.component';
import {ViewNegotiator} from './viewnegotiator.component';

// import {PloneRouterOutlet} from '../../router';


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
    Breadcrumbs,
    // PloneRouterOutlet
  ],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@Routes([
   { path: '', component: ViewNegotiator },
   { path: '*', component: ViewNegotiator }
])
export class App{

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Initializing the component App. This is for karma test.');
  }

}
