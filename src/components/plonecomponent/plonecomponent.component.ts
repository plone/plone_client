import {Component, DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {Logo} from '../logo/logo.component';
import {Search} from '../search/search.component';

// TODO: put all the plone components in a namespace, so we can inspect it
// instead of managing this dictionnary here:
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

    constructor(dcl: DynamicComponentLoader = null, container: ViewContainerRef = null) {
        if (!this.dcl && dcl) {
            this.dcl = dcl;
            this.container = container;
        }
    }

    ngOnInit() {
        // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
        // avoid useless markup
        this.dcl.loadNextToLocation(PLONE_COMPONENTS[this.klass], this.container);
    }
}
