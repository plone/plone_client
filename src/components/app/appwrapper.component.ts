import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Route} from '@angular/router';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../view/view.component';
import {Edit} from '../edit/edit.component';
import TitleTile from '../title-tile/title-tile.component';
import {App} from './app.component';
import {DefaultRouterUrlSerializer, RouterUrlSerializer} from '@angular/router';
import {UrlSegment, Tree, TreeNode, rootNode, UrlTree} from '@angular/router/src/segments';



/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'plone-app-wrapper',
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: `
<router-outlet></router-outlet>`
})
@Routes([
  new Route({ path: '/', component: App }),
  new Route({ path: '', component: App }),
  new Route({ path: '/*', component: App }),
  // new Route({ path: '/front-page', component: App }),
  // new Route({ path: '/news/foobar', component: App })
])
export class AppWrapper {

  constructor(private router: Router) {}

}
