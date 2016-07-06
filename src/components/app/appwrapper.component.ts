import {Component, Directive} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Http} from '@angular/http';
import { AppState } from '../../services/app.service';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'plone-app-wrapper',
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppWrapper {

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
