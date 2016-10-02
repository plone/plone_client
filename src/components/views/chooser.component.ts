import {Component,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  ViewChild,
  ComponentFactoryResolver,
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
  selector: 'view-chooser',
  template: '<div #target></div>'
})
export class ViewChooser {
  @ViewChild('target', {read: ViewContainerRef}) private container: ViewContainerRef;
  private viewInstance: any;
  private resolver: ComponentFactoryResolver;
  private route: ActivatedRoute;
  private routeSubscriber: any;

  constructor(
    container: ViewContainerRef,
    resolver: ComponentFactoryResolver,
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
        if(urlPath[i].path.indexOf('!!') !== -1) {
          viewName = urlPath[i].path.slice(2);
        }
      }
      if(viewName) {
        viewClass = Registry.getView(viewName);
      } else {
        viewClass = View;
      }

      this.viewInstance = this.createView(this.container, viewClass);
    });
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
    if(this.viewInstance) {
      this.viewInstance.destroy();
    }
  }

  createView(container: ViewContainerRef, viewClass: any): ComponentRef<any> {
    let componentFactory = this.resolver.resolveComponentFactory(viewClass);
    return container.createComponent(componentFactory);
  }
}
