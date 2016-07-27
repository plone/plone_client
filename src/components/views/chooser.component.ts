import {Component,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  ViewChild,
  ComponentResolver,
  ReflectiveInjector
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Registry} from '../app/registry';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../views/base/base.component';
import {Edit} from '../views/edit/edit.component';
import {Add} from '../views/add/add.component';
import {Login} from '../views/login/login.component';
import {Logout} from '../views/logout/logout.component';
import {Search} from '../views/search/search.component';
import TitleTile from '../title-tile/title-tile.component';

Registry.registerView('', View);
Registry.registerView('edit', Edit);
Registry.registerView('add', Add);
Registry.registerView('login', Login);
Registry.registerView('logout', Logout);
Registry.registerView('search', Search);


@Component({
  selector: 'view-chooser', // <app></app>
  template: '<div #target></div>'
})
export class ViewChooser {
  @ViewChild('target', {read: ViewContainerRef}) target;
  cmpRef: ComponentRef<any>; 
  private container: ViewContainerRef;
  private resolver: ComponentResolver;
  private route: ActivatedRoute;
  private routeSubscriber: any;

  constructor(
    container: ViewContainerRef,
    resolver: ComponentResolver,
    route: ActivatedRoute
  ) {
    this.container = container;
    this.resolver = resolver;
    this.route = route;
  }

  ngOnInit() {
    this.routeSubscriber = this.route.url.subscribe(urlPath => {
      let viewName: string;
      let viewClass: any;
      for(let i=0; i<urlPath.length; i++) {
        if(urlPath[i].path.indexOf('@@') !== -1) {
          viewName = urlPath[i].path.slice(2);
        }
      }
      if(viewName) {
        viewClass = Registry.getView(viewName);
      } else {
        viewClass = View;
      }

      this.createView(viewClass);
    });
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  createView(viewClass: any) {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
    this.resolver.resolveComponent(viewClass).then(
      (factory:ComponentFactory<any>) => {
        this.cmpRef = this.target.createComponent(factory)
      }
    );
  }
}
