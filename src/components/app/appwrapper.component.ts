import {Component, Directive} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Http} from '@angular/http';
import {App} from './app.component';
import { AppState } from '../../services/app.service';

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
  { path: '', component: App },
  { path: '/*', component: App }
])
export class AppWrapper {

  constructor(private router: Router, public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
