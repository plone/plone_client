import { Component } from '@angular/core';
import { AppState } from '../../services/app.service';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'plone-app-wrapper',
  template: `<router-outlet></router-outlet>`
})
export class AppWrapper {

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
