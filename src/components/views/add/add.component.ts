import {Component, Renderer} from '@angular/core';
import {Model} from '../../../models/model';
import {ObjectService} from '../../../services/object.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'plone-view-edit',
  template: require('./add.component.html')
})
export class Add {
  model: Model = {
    created: undefined,
    modified: undefined,
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
  type: string;

  constructor(private objectService: ObjectService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    let path = this.location.path();
    this.path = path.split('/!!')[0];
    this.type = path.split('/!!')[1].split('/')[1];
  }

  onAdd() {
    this.model['@context'] = '/@@context.jsonld';
    this.model['@type'] = this.type;
    // TODO: fix plone.app.textfield transformation issue
    delete this.model.text;
    this.objectService.create(this.path, this.model).subscribe(res => {
      this.router.navigateByUrl(this.path);
    });
  }

  onCancel() {
    this.router.navigateByUrl(this.path);
  }
}
