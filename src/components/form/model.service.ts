import { Injectable, EventEmitter } from '@angular/core'
import { Subject }    from 'rxjs/Subject';
import { Model } from '../../models/model';

@Injectable()
export class ModelService {

  model: Model = {};

  modelChange: EventEmitter<Model> = new EventEmitter();
  fieldChange: EventEmitter<any> = new EventEmitter();

  constructor() { 
    //subscribe to the event fieldChangeEmitter
    this.fieldChange.subscribe(stringInput => {
      this.model[stringInput.name] = stringInput.value;
    });
  }

  getModelChangeEmitter() {
    return this.modelChange;
  }

  getModel() {
    return this.model;
  }

  loadModel(model: any) {
    this.model = model;
    this.modelChange.emit(model);
  }

  getFieldChangeEmitter() {
    return this.fieldChange;
  }

}