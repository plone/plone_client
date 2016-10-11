import {
  Component,
  Renderer,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {ObjectService} from '../../../services/object.service';
import {Location} from '@angular/common';
import {Model, Summary} from '../../../models/model';
import {ObjectUtility} from '../../../injectors/object';


@Component({
  selector: 'plone-base-view',
  template: require('./base.component.html'),
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 10 ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class View {
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
  items = [];
  path = '/front-page';

  constructor(private objectService: ObjectService,
              private location: Location,
              public utility: ObjectUtility) {
  }

  ngOnInit() {
    this.path = this.location.path() || '/front-page';
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
    });
  }

}
