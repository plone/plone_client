import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Route} from '@angular/router';
import {Http} from '@angular/http';
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
  new Route({ path: '', component: App }),
  new Route({ path: '/', component: App }),
  new Route({ path: '/*', component: App }),
  new Route({ path: '*', component: App })
])
export class AppWrapper {

  constructor(private router: Router) {}

}
