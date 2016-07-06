import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  config = {
    url: ''
  };

  constructor() {
    if (process.env.PLONE === undefined) {
      // in case we are testing we don't have a PLONE BACKEND
      this.config.url = 'http://missing.site/';
    } else {
      this.config.url = process.env.PLONE;
    }
   }

  get(key: string) {
    return this.config[key];
  }
}
