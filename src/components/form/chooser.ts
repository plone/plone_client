import {Component, DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {FieldRegistry} from './registry';

import {DefaultField} from './fields/default';


@Component({
    selector: 'field',
    directives: FieldRegistry.getFields(),
    template: `<div></div>`
})
export class FieldChooser {
    dcl: DynamicComponentLoader;
    container: ViewContainerRef;
    @Input('name') name: string;
    @Input('settings') settings: any;

    constructor(dcl: DynamicComponentLoader = null, container: ViewContainerRef = null) {
        if (!this.dcl && dcl) {
            this.dcl = dcl;
            this.container = container;
        }
    }

    ngOnInit() {
        var _this = this;
        // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
        // avoid useless markup
        var field = FieldRegistry.getField(this.name);
        if(!field) {
            field = DefaultField;
        }
        this.dcl.loadNextToLocation(field, this.container).then(ref => {
            ref.instance.label = _this.settings.description;
        });
    }
}