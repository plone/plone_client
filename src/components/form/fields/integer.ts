import {Component, Input} from '@angular/core';
import {BaseField} from './base';
import {ModelService} from '../model.service';


@Component({
    selector: 'integer-field',
    template: require('./integerfield.component.html')
})
export class IntegerField extends BaseField {
	@Input('value') value: number;

    constructor(private modelService: ModelService) {
        super();
        modelService.getModelChangeEmitter().subscribe(model => {
            this.value = model[this.name];
        });
    }

    ngOnInit() {
        this.value = this.modelService.getModel()[this.name];
    }
}
