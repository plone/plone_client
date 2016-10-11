import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from '@angular/core';
import {AuthUtils} from '../../injectors/authUtils';
import {ConfigurationService} from '../../services/configuration.service';

/////////////////////////
// ** MAIN APP COMPONENT **

import './app.component.scss';

@Component({
  selector: 'plone-app',
  template: require('./app.component.html')
})

export class App {

  authenticated = false;
  constructor(
    private configuration: ConfigurationService,
    private authUtils: AuthUtils
  ) {
    //this.authenticated = this.authUtils.isAuthenticated();
  }

  ngOnInit() {
    console.log('Initializing the component App. This is for karma test.');
    this.authUtils.isAuthenticated.subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
    })
  }

}
