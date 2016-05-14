import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {Header} from '../header/header.component';
import {Footer} from '../footer/footer.component';
import {View} from '../view/view.component';
import TitleTile from '../title-tile/title-tile.component';
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly
@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

/////////////////////////
// ** Example Components
@Component({
  selector: 'home',
  template: `
    <div>This is the "Home" page</div>
  `
})
export class Home { }

@Component({
  selector: 'about',
  template: `
  <div>This is the "About" page</div>
  `
})
export class About { }

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
    Header,
    TitleTile,
    Footer
  ],
  styles: [
    require('./app.component.css')
  ],
  template: require('./app.component.html')
})
@RouteConfig([
//  { path: '/**/edit', component: Edit, name: 'Edit' }
  { path: '/**', component: View, name: 'View' }
])
export class App {
}
