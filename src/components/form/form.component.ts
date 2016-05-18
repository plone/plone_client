import {Component, Directive, Input} from '@angular/core';
import {FieldChooser} from './chooser';
import {FieldRegistry} from './registry';
import {StringField} from './fields/string';
import {IntegerField} from './fields/integer';

FieldRegistry.registerField('string', StringField);
FieldRegistry.registerField('integer', IntegerField);

@Component({
    selector: 'schema-form',
    directives: [
        FieldChooser
    ],
    template: require('./form.component.html')
})
export class Form {
    _model: any;
    _components: {} = {};
    _schema: any;
    fields: { field: any, type: string }[] = [];

    constructor() {}

    @Input()
    set model(value: any) {
        this._model = value;
        if(this._schema) {
            for(var id in this._schema.properties) {
                if(this._components[id]) {
                    this._components[id].model = this._model[id];
                }
            }
        }
    }

    get model() {
        return this._model;
    }

    ngOnInit() {
        this._schema = {
            "title": "Example Schema",
            "type": "object",
            "properties": {
                "title": {
                    "description": "Title",
                    "type": "string"
                },
                "description": {
                    "description": "Description",
                    "type": "string"
                }
            },
            "required": ["title", "lastName"]
        };

        var fields = [];

        for(var id in this._schema.properties) {
            var settings = this._schema.properties[id];
            if(this._schema.required.indexOf(id) > -1) {
                settings.required = true;
            }
            this._components[id] = new FieldChooser()
            fields.push({
                field: this._components[id],
                type: settings['type'],
                id: id,
                settings: settings,
                model: this._model[id]
            });
        }
        this.fields = fields;
    }
}
