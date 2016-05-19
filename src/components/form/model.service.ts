import { Injectable, EventEmitter } from '@angular/core'
import { Subject }    from 'rxjs/Subject';
import { Model } from '../../models/model';

@Injectable()
export class ModelService {

  model: Model = {
    created: null,
    modified: null,
    title: 'my title',
    description: '',
    UID: '',
    member: [],
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };

  modelChange: EventEmitter<Model> = new EventEmitter();
  
  // private modelSource = new Subject<Model>();

  // model$ = this.modelSource.asObservable();

  constructor() { }

  getModelChangeEmitter() {
    return this.modelChange;
  }

  getModel() {
    return this.model;
  }

  setModel(model: any) {
    debugger;
    this.model = model;
    this.modelChange.emit(model);
    // this.modelSource.next(model);
    // this.modelSource.complete();
  }
}