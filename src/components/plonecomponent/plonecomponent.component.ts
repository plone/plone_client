import {Component, DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Logo} from '../logo/logo.component';
import {Search} from '../search/search.component';

const PLONE_COMPONENTS = {
    'Logo': Logo,
    'Search': Search
};

@Component({
    selector: 'plone-component',
    directives: [
        Logo,
        Search
    ],
    template: `<div></div>`
})
export class PloneComponent {
    dcl: DynamicComponentLoader;
    container: ViewContainerRef;
    @Input('klass') klass: string;

    constructor(dcl: DynamicComponentLoader, container: ViewContainerRef) {
        if (!this.dcl && dcl) {
            this.dcl = dcl;
            this.container = container;
        }
    }

    ngOnInit() {
        this.dcl.loadNextToLocation(PLONE_COMPONENTS[this.klass], this.container);
    }
}
