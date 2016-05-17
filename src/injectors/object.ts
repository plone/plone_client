import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Model} from '../models/model';


@Injectable()
export class ObjectUtility {

  constructor(){}

  getUrl(item: Model){
    // hacking the url to work again...
    // these are urls from resources on the backend
    var url = item['@id'];
    var split = url.split('/');
    split.splice(0, 3);
    url = '/' + split.join('/');
    if(url.indexOf('/Plone/') !== -1){
      url = '/' + url.split('/Plone/')[1];
    }
    return url;
  }
}
