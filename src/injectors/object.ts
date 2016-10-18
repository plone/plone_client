import { Injectable } from '@angular/core';
import {Model} from '../models/model';
import {Location} from '@angular/common';
import {ConfigurationService} from '../services/configuration.service';

const urlkey = 'url';

@Injectable()
export class ObjectUtility {

  constructor(
    private location: Location,
    private configuration: ConfigurationService
  ) {}

  getCurrentPath() {
    let path = this.location.path() || '/front-page';
    if (path.indexOf('!!') !== -1) {
      let split = path.split('!!');
      path = split[0];
    }
    return path;
  }

  getUrl(item: Model) {
    let baseurl = this.configuration.get('url');
    let url = item['@id'];

    if (!url) {
      url = item[urlkey];
    }
    if (!url) {
      return '';
    }
    if(url.startsWith(baseurl)) {
      url = url.slice(baseurl.length);
    }
    if (['/', ''].indexOf(url) !== -1) {
      url = '/front-page';
    }
    return url;
  }
}
