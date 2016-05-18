import {Component} from '@angular/core';
import {BaseField} from './base';


@Component({
    selector: 'string-field',
    template: require('./stringfield.component.html')
})
export class StringField extends BaseField {

    constructor() {
        super();
    }

    ngOnInit() {
        
    }
}
