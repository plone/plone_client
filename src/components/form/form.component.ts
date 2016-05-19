import {Component, Directive, Input} from '@angular/core';
import {FieldChooser} from './chooser';
import {FieldRegistry} from './registry';
import {StringField} from './fields/string';
import {IntegerField} from './fields/integer';
import {Model} from '../../models/model';
import {ObjectService} from '../../services/object.service';
import {ModelService} from './model.service';

FieldRegistry.registerField('string', StringField);
FieldRegistry.registerField('integer', IntegerField);

@Component({
    selector: 'schema-form',
    directives: [
        FieldChooser
    ],
    providers: [ObjectService, ModelService],
    template: require('./form.component.html')
})
export class Form {
    @Input('path') path: string;
    model: Model = {
        created: null,
        modified: null,
        title: '',
        description: '',
        UID: '',
        member: [],
        text: {
          data: '',
          encoding: '',
          'content-type': ''
        }
    };
    _components: {} = {};
    _schema: any;
    fields: { field: any, type: string }[] = [];

    constructor(
        private objectService: ObjectService,
        private modelService: ModelService
    ) {}

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
        this.objectService.get(this.path).subscribe(res => {
            this.model = res.json();
            this.modelService.setModel(this.model);
        });

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
                settings: settings
            });
        }
        this.fields = fields;
    }
}
