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
    instance: any;
    _model: any;
    @Input('typename') typename: string;
    @Input('id') id: string;
    @Input('settings') settings: any;

    constructor(dcl: DynamicComponentLoader = null, container: ViewContainerRef = null) {
        if (!this.dcl && dcl) {
            this.dcl = dcl;
            this.container = container;
        }
    }

    @Input()
    set model(value: any) {
        this._model = value;
        if (this.instance) {
            this.instance.value = value;
        }
    }

    get model() {
        return this._model;
    }

    ngOnInit() {
        var _this = this;
        // TODO: find a way to use loadAsRoot instead of loadNextToLocation to
        // avoid useless markup
        var field = FieldRegistry.getField(this.typename);
        if(!field) {
            field = DefaultField;
        }
        this.dcl.loadNextToLocation(field, this.container).then(ref => {
            ref.instance.settings = _this.settings;
            ref.instance.name = _this.id;
            ref.instance.value = this._model;
            _this.instance = ref.instance;
        });
    }
}