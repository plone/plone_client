import {Component} from '@angular/core';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../views/base/base.component';
import {Edit} from '../views/edit/edit.component';
import {Add} from '../views/add/add.component';
import {Login} from '../views/login/login.component';
import TitleTile from '../title-tile/title-tile.component';
import {DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Location} from '@angular/common';


export namespace ViewRegistry {
  let _registered: { } = {};

  export function register(name: string, view: any ) {
    _registered[name] = view;
  }

  export function getView(name: string){
    return _registered[name];
  }
}

ViewRegistry.register('', View);
ViewRegistry.register('edit', Edit);
ViewRegistry.register('add', Add);
ViewRegistry.register('login', Login);


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

    ngOnInit() {``
      // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
      // avoid useless markup
      var path = this.location.path();
      let viewClass:any = View;
      if(path.indexOf('@@') !== -1){
        var split = path.split('@@');
        var viewName = split[split.length - 1];
        viewClass = ViewRegistry.getView(viewName);
      }
      this.dcl.loadNextToLocation(viewClass, this.container);
    }
}


export { ViewRegistry as registry };
