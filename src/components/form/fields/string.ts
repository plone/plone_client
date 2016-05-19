import {Component, Input} from '@angular/core';
import {BaseField} from './base';
import {ModelService} from '../model.service';

@Component({
    selector: 'string-field',
    template: require('./stringfield.component.html'),
    providers: [ModelService]
})
export class StringField extends BaseField {

    @Input('value') value: string = "loading...";
    form: any;

    constructor(private modelService: ModelService) {
        super();
        debugger;
        modelService.getModelChangeEmitter().subscribe(model => {
            debugger;
            this.value = model.title;
        })
    }

    ngOnInit() {
        this.value = this.modelService.getModel().title;
    }
}
