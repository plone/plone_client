import {Component, DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
    selector: 'plone-component',
    directives: Registry.getComponents(),
    template: `<div></div>`
})
export class PloneComponent {
    dcl: DynamicComponentLoader;
    container: ViewContainerRef;
    @Input('name') name: string;

    constructor(dcl: DynamicComponentLoader = null, container: ViewContainerRef = null) {
        if (!this.dcl && dcl) {
            this.dcl = dcl;
            this.container = container;
        }
    }

    ngOnInit() {
        // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
        // avoid useless markup
        this.dcl.loadNextToLocation(Registry.getComponent(this.name), this.container);
    }
}
