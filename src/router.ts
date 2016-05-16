import {
  ResolvedReflectiveProvider,
  Directive,
  DynamicComponentLoader,
  ViewContainerRef,
  Attribute,
  ComponentRef,
  ComponentFactory,
  ReflectiveInjector,
  OnInit
} from '@angular/core';
import {RouterOutletMap} from '@angular/router';
import {DEFAULT_OUTLET_NAME} from '@angular/router/src/constants';
import {isPresent, isBlank} from '@angular/router/src/facade/lang';
import {RouterOutlet} from '@angular/router/src/directives/router_outlet';

/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <plone-router-outlet></plone-router-outlet>
 * ```
 *
 * Outlets can be named.
 *
 * ```
 * <plone-router-outlet name="right"></plone-router-outlet>
 * ```
 */
@Directive({selector: 'plone-router-outlet'})
export class PloneRouterOutlet extends RouterOutlet {
  private _activated: ComponentRef<any>;

  constructor(parentOutletMap: RouterOutletMap, private __location: ViewContainerRef,
              @Attribute('name') name: string) {
    super(parentOutletMap, __location, name);
    parentOutletMap.registerOutlet(isBlank(name) ? DEFAULT_OUTLET_NAME : name, this);
  }

  /**
   * Called by the Router to instantiate a new component.
   */
  activate(factory: ComponentFactory<any>, providers: ResolvedReflectiveProvider[],
           outletMap: RouterOutletMap): ComponentRef<any> {
    this.outletMap = outletMap;
    let inj = ReflectiveInjector.fromResolvedProviders(providers, this.__location.parentInjector);
    this._activated = this.__location.createComponent(factory, this.__location.length, inj, []);
    return this._activated;
  }
}
