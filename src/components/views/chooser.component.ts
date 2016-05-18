import {Component} from '@angular/core';
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
import {DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Location} from '@angular/common';


Registry.registerView('', View);
Registry.registerView('edit', Edit);
Registry.registerView('add', Add);
Registry.registerView('login', Login);
Registry.registerView('logout', Logout);
Registry.registerView('search', Search);


@Component({
  selector: 'view-chooser', // <app></app>
  template: `<div></div>`
})
export class ViewChooser {
  dcl: DynamicComponentLoader;
  container: ViewContainerRef;

  constructor(dcl: DynamicComponentLoader, container: ViewContainerRef,
              public location: Location) {
    if (!this.dcl && dcl) {
      this.dcl = dcl;
      this.container = container;
    }
  }

    ngOnInit() {
      // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
      // avoid useless markup
      var path = this.location.path();
      let viewClass:any = View;
      if(path.indexOf('@@') !== -1){
        var split = path.split('@@');
        var end = split[split.length - 1];
        // for instance, search uses paths like /@@search/my-query-string
        split = end.split('/');
        var viewName = split[0];
        viewClass = Registry.getView(viewName);
      }
      this.dcl.loadNextToLocation(viewClass, this.container);
    }
}
