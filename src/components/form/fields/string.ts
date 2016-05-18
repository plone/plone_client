import {Component, Input} from '@angular/core';
import {BaseField} from './base';


@Component({
    selector: 'string-field',
    template: require('./stringfield.component.html')
})
export class StringField extends BaseField {
    _model: any;
    value: any;

    constructor() {
        super();
    }

    @Input()
    set model(value: any) {
        this._model = value;
        this.value = value;
    }

    get model() {
        return this._model;
    }

    ngOnInit() {
        
    }
}
