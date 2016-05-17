import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Model} from '../models/model';


@Injectable()
export class ObjectUtility {

  constructor(){}

  getUrl(item: Model){
    var url = item['@id'];
    var split = url.split('/');
    split.splice(0, 3);
    return '/' + split.join('/');
  }
}
