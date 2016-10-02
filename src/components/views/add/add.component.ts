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

  constructor(private objectService: ObjectService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.path = this.location.path() || '/front-page';
    this.path = this.path.split('/!!')[0];
  }

  onAdd() {
    this.model['@context'] = '/@@context.jsonld';
    // until we figure out routing...
    this.model['@type'] = window.location.search.replace('?type=', '');
    this.objectService.create(this.path, this.model).subscribe(res => {
      this.router.navigateByUrl(this.path);
    });
  }

  onCancel() {
    this.router.navigateByUrl(this.path);
  }
}
