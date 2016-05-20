import {Component, Input} from '@angular/core';
import {BaseField} from './base';
import {ModelService} from '../model.service';

@Component({
    selector: 'textline-field',
    template: require('./textline.component.html'),
    providers: []
})
export class TextLineField extends BaseField {

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
