import {Component,
  ViewContainerRef,
  ComponentRef,
  ComponentResolver,
  ReflectiveInjector
} from '@angular/core';
import {Location} from '@angular/common';
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
  template: ''
})
export class ViewChooser {
  private container: ViewContainerRef;
  private resolver: ComponentResolver;
  private location: Location;

  constructor(container: ViewContainerRef, resolver: ComponentResolver, location: Location) {
    this.container = container;
    this.resolver = resolver;
    this.location = location;
  }
  ngOnInit() {
    let viewClass: any = View;
    let path = this.location.path();
    if (path.indexOf('@@') !== -1) {
      let split = path.split('@@');
      let end = split[split.length - 1];
      // for instance, search uses paths like /@@search/my-query-string
      split = end.split('/');
      let viewName = split[0];
      viewClass = Registry.getView(viewName);
    }
    this.createView(viewClass);
  }
  createView(viewClass: any): Promise<ComponentRef<any>> {
    return new Promise(
      (resolve, reject) => {
        this.resolver.resolveComponent(viewClass).then(
          componentFactory => {
            let injector = ReflectiveInjector.fromResolvedProviders([], this.container.injector);
            let component = this.container.createComponent(componentFactory, 0, injector);
            resolve(component);
          }
        );
      }
    );
  }
}
