import {Component} from '@angular/core';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {View} from '../view/view.component';
import {Edit} from '../edit/edit.component';
import {Add} from '../add/add.component';
import TitleTile from '../title-tile/title-tile.component';
import {DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'view-negotiator', // <app></app>
  template: `<div></div>`
})
export class ViewNegotiator {
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
      if(path.indexOf('@@edit') !== -1){
        viewClass = Edit;
      }
      if(path.indexOf('@@add') !== -1){
        viewClass = Add;
      }
      this.dcl.loadNextToLocation(viewClass, this.container);
    }
}
