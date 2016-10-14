import { WidgetRegistry } from "angular2-schema-form"; 
import { TinyMCEWidget } from "ng2sf-tinymce";
import {
  Component,
  Directive,
  ElementRef,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
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
    private authUtils: AuthUtils,
    private widgetRegistry: WidgetRegistry
  ) {
    //this.authenticated = this.authUtils.isAuthenticated();
    widgetRegistry.register("tinymce", TinyMCEWidget);
  }

  ngOnInit() {
    console.log('Initializing the component App. This is for karma test.');
    this.authUtils.isAuthenticated.subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
    })
  }

}
