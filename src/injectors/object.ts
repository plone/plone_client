import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Model} from '../models/model';
import {Location} from '@angular/common';

const urlkey = 'url';

@Injectable()
export class ObjectUtility {

  constructor(private location: Location) {}

  getCurrentPath() {
    let path = this.location.path() || '/front-page';
    if (path.indexOf('@@') !== -1) {
      let split = path.split('@@');
      path = split[0];
    }
    return path;
  }

  getUrl(item: Model) {
    // hacking the url to work again...
    // these are urls from resources on the backend
    let url = item['@id'];

    if (!url) {
      url = item[urlkey];
    }
    if (!url) {
      return '';
    }
    let split = url.split('/');
    split.splice(0, 3);
    url = '/' + split.join('/');
    if (url.indexOf('/Plone/') !== -1) {
      url = '/' + url.split('/Plone/')[1];
    }
    if (['/Plone', '', '/'].indexOf(url) !== -1) {
      url = '/front-page';
    }
    return url;
  }
}
