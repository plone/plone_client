import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
import TitleTile from '../../title-tile/title-tile.component';
import {Router} from '@angular/router';
import {Model} from '../../../models/model';
import {ObjectService} from '../../../services/object.service';
import {Location} from '@angular/common';
import {ObjectUtility} from '../../../injectors/object';
import {Form} from '../../form/form.component';


@Component({
  selector: 'plone-view-edit',
  directives: [
    TitleTile,
    Form
  ],
  providers: [ObjectService, ObjectUtility],
  template: require('./edit.component.html')
})
export class Edit {
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
  path = '';

  constructor(private objectService: ObjectService,
              private router: Router,
              private location: Location,
              private utility: ObjectUtility) {
  }

  ngOnInit() {
    this.path = this.location.path() || '/front-page';
    this.path = this.path.split('/@@')[0];
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
    });
  }

  onSave() {
    // only care about editable things...
    var data = {
      '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
      '@id': this.model['@id'],
      'title': this.model.title,
      'description': this.model.description
    };
    if(this.model.text){
      data['text'] = this.model.text;
    }

    this.objectService.put(this.path, data).subscribe(res => {
      this.router.navigate([this.utility.getUrl(this.model)]);
    });
  }

  onCancel() {
    this.router.navigate([this.utility.getUrl(this.model)]);
  }
}
