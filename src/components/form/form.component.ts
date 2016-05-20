import {Component, Directive, Input} from '@angular/core';
import {FieldChooser} from './chooser';
import {FieldRegistry} from './registry';
import {StringField} from './fields/string';
import {IntegerField} from './fields/integer';
import {TextLineField} from './fields/textline';
import {Model} from '../../models/model';
import {ObjectService} from '../../services/object.service';
import {ModelService} from './model.service';

FieldRegistry.registerField('string', StringField);
FieldRegistry.registerField('integer', IntegerField);
FieldRegistry.registerField('textline', TextLineField);

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
    url: string;

    constructor(
        private objectService: ObjectService,
        private modelService: ModelService
    ) {}

    ngOnInit() {
        this.url = 'http://castanyera.iskra.cat:8070/Plone';

        this.objectService.get(this.path).subscribe(res => {
            this.model = res.json();
            this.modelService.setModel(this.model);
            this.objectService.schema(this.url + "/@types/" + this.model["@type"]).subscribe(res => {
                var fields = [];

                this._schema = res.json();

                for (var id in this._schema.properties) {
                    var settings = this._schema.properties[id];
                    if (this._schema.required.indexOf(id) > -1) {
                        settings.required = true;
                    }
                    var type = settings['type'];
                    // TODO
                    if (id === "description") {
                        type = "textline";
                    }
                    this._components[id] = new FieldChooser()
                    fields.push({
                        field: this._components[id],
                        type: type,
                        id: id,
                        settings: settings
                    });
                }

                this.fields = fields;
            });
        });



        
    }
}
