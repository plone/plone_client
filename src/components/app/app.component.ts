import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from '@angular/core';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import TitleTile from '../title-tile/title-tile.component';
import {ViewChooser} from '../views/chooser.component';
import {RightColumn} from '../columns/rightcolumn.component';
import {AuthUtils} from '../../injectors/authUtils';
import {ConfigurationService} from '../../services/configuration.service';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'plone-app',
  directives: [
    Header,
    TitleTile,
    Footer,
    Navigation,
    Toolbar,
    Breadcrumbs,
    ViewChooser,
    RightColumn
  ],
  styles: [ require('./app.component.scss') ],
  providers: [
    ConfigurationService,
    AuthUtils
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.component.html')
})

export class App {

  authenticated = false;
  constructor(
    private configuration: ConfigurationService,
    private authUtils: AuthUtils
  ) {
    this.authenticated = this.authUtils.isAuthenticated();
  }

  ngOnInit() {
    console.log('Initializing the component App. This is for karma test.');
  }

}
