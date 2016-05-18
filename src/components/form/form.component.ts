import {Component, Directive} from '@angular/core';
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
    fields: { field: any, type: string }[] = [];

    constructor() {}

    ngOnInit() {
        var schema = {
            "title": "Example Schema",
            "type": "object",
            "properties": {
                "firstName": {
                    "description": "First name",
                    "type": "string"
                },
                "lastName": {
                    "description": "Last name",
                    "type": "string"
                },
                "age": {
                    "description": "Age in years",
                    "type": "integer",
                    "minimum": 0
                }
            },
            "required": ["firstName", "lastName"]
        };

        var fields = [];

        for(var id in schema.properties) {
            var param = schema.properties[id];
            fields.push({
                field: new FieldChooser(),
                type: param['type'],
                settings: param
            });
        }
        this.fields = fields;
    }
}
