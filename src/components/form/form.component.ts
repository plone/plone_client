import {Component, Directive, Input} from '@angular/core';
import {FieldChooser} from './chooser';
import {FieldRegistry} from './registry';
import {StringField} from './fields/string';
import {IntegerField} from './fields/integer';
import {TextLineField} from './fields/textline';
import {Model} from '../../models/model';
import {ObjectService} from '../../services/object.service';
import {ModelService} from './model.service';
import {Router} from '@angular/router';
import {ObjectUtility} from '../../injectors/object';
import {ConfigurationService} from '../../services/configuration.service';

FieldRegistry.registerField('string', StringField);
FieldRegistry.registerField('integer', IntegerField);
FieldRegistry.registerField('textline', TextLineField);

@Component({
    selector: 'schema-form',
    directives: [
        FieldChooser
    ],
    providers: [ModelService],
    template: require('./form.component.html')
})
export class Form {
    @Input('path') path: string;
    _components: {} = {};
    _schema: any;
    fields: { field: any, type: string }[] = [];
    baseurl: string;

    constructor(
        private objectService: ObjectService,
        private modelService: ModelService,
        private configuration: ConfigurationService,
        private utility: ObjectUtility,
        private router: Router

    ) {}

    ngOnInit() {
        // this.url = 'http://castanyera.iskra.cat:8070/Plone';
        this.baseurl = this.configuration.get('url');

        this.objectService.get(this.path).subscribe(res1 => {
            let model = res1.json();

            this.objectService.schema(this.baseurl + '/@types/' + model['@type']).subscribe(res => {
                let fields = [];
                let ids = [];

                this._schema = res.json();

                for (let id in this._schema.properties) {
                  if (this._schema.properties.hasOwnProperty(id)) {
                    let settings = this._schema.properties[id];
                    if (this._schema.required.indexOf(id) > -1) {
                        settings.required = true;
                    }
                    const typeKey = 'type';
                    let type = settings[typeKey];
                    // TODO: remove exception
                    if (id === 'description') {
                        type = 'textline';
                    }
                    this._components[id] = new FieldChooser();
                    fields.push({
                        field: this._components[id],
                        type: type,
                        id: id,
                        settings: settings
                    });
                    ids.push(id);
                  }
                }
                this.fields = fields;
                // only care about editable things...
                // TODO: when API will provide the fields attribute
                let dataModel = {};
                for (let id in model) {
                    if (ids.indexOf(id) > -1 || id === '@type') {
                        dataModel[id] = model[id];
                    }
                }
                this.modelService.loadModel(dataModel);
            });
        });

    }
    onSave() {
        this.objectService.put(this.path, this.modelService.getModel()).subscribe(res => {
            this.router.navigate([this.utility.getUrl(this.modelService.getModel())]);
        });
    }

   onCancel() {
       this.router.navigate([this.utility.getUrl(this.modelService.getModel())]);
   }
}
