import {Component, Directive} from '@angular/core';
import {Model} from '../../../models/model';
import {ObjectService} from '../../../services/object.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ObjectUtility} from '../../../injectors/object';
import {ConfigurationService} from '../../../services/configuration.service';


@Component({
    selector: 'plone-view-edit',
    template: require('./edit.component.html')
})
export class Edit {
    private schema:any = {};
    private actions:any = {};
    private model:any;
    private path:string = '';

    constructor(
        private objectService: ObjectService,
        private configuration: ConfigurationService,
        private location: Location,
        private utility: ObjectUtility,
        private router: Router
    ) {
        this.model = {};
        this.schema = {
            'properties': {}
        };
    }

    ngOnInit() {
        this.path = this.location.path() || '/front-page';
        this.path = this.path.split('/!!')[0];

        let form = this;
        let baseurl = this.configuration.get('url');

        this.objectService.get(this.path).subscribe(res1 => {
            let model = res1.json();

            this.objectService.schema(
                baseurl + '/@types/' + model['@type'])
            .subscribe(res => {
                let schema = res.json();
                // FIX THE SCHEMA (but we should rather fix the API)
                for(let property in schema.properties) {
                    if(schema.properties[property].widget === 'richtext') {
                        schema.properties[property].widget = 'tinymce';
                        if(model[property] && model[property].data) {
                            model[property] = model[property].data
                        }
                    }
                    if(property === 'allow_discussion') {
                        schema.properties[property].type = 'boolean';
                    }
                    if(property === 'effective' || property === 'expires') {
                        schema.properties[property].widget = 'date';
                    }
                };
                schema.buttons = [
                    {id: 'save', label: 'Save'},
                    {id: 'cancel', label: 'Cancel'}
                ];
                this.actions = {
                    save: form.onSave.bind(form),
                    cancel: form.onCancel.bind(form)
                };
                this.schema = schema;
                this.model = model;
            });
        });
    }

    onSave(schemaForm) {
        let value = schemaForm.value;
        // SHOULD BE FIXED IN ANGULAR SCHEMA FORM
        if(value.effective==='') {
            delete value.effective;
        }
        if(value.expires==='') {
            delete value.expires;
        }
        this.objectService.put(this.path, value).subscribe(res => {
            this.router.navigate([this.utility.getUrl(this.model)]);
        });
    }

   onCancel() {
       this.router.navigate([this.utility.getUrl(this.model)]);
   }
}
