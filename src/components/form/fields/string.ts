import {Component, Input, EventEmitter} from '@angular/core';
import {BaseField} from './base';
import {ModelService} from '../model.service';

@Component({
    selector: 'string-field',
    template: require('./stringfield.component.html'),
    providers: []
})
export class StringField extends BaseField {

    @Input('value') value: string = "";
    valueChange: EventEmitter<any> = new EventEmitter();

    constructor(private modelService: ModelService) {
        super();
        modelService.getModelChangeEmitter().subscribe(model => {
            this.value = model[this.name];
        })
    }

    ngOnInit() {
        this.value = this.modelService.getModel()[this.name];
    }

    getValueChangeEmitter() {
        return this.valueChange;
    }

    change(stringInput) {
        this.value = stringInput.value;
        this.modelService.getFieldChangeEmitter().emit(stringInput);
    }
}
