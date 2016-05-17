import {Component} from '@angular/core';
import {BaseField} from './base';
import {FieldRegistry} from '../registry';

@Component({
    selector: 'text-field',
    template: require('./textfield.component.html')
})
export class TextField extends BaseField {

    constructor() {
        super();
    }
}

FieldRegistry.registerField('text', TextField);