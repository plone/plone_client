import {Component, Input} from '@angular/core';
import {BaseField} from './base';
import {ModelService} from '../model.service';

@Component({
    selector: 'string-field',
    template: require('./stringfield.component.html'),
    providers: []
})
export class StringField extends BaseField {

    @Input('value') value: string = "";
    form: any;

    constructor(private modelService: ModelService) {
        super();
        modelService.getModelChangeEmitter().subscribe(model => {
            this.value = model[this.name];
        })
    }

    ngOnInit() {
        this.value = this.modelService.getModel()[this.name];
    }
}
