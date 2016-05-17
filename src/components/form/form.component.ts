import {Component, Directive} from '@angular/core';
import {FieldChooser} from './chooser';

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
                    "type": "string"
                },
                "lastName": {
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

        for(var field in schema.properties) {
            fields.push({field: new FieldChooser(), type: 'text'});
        }
        this.fields = fields;
    }
}
