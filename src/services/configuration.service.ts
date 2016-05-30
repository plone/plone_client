import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  config = {
    url: ''
  };

  constructor() {
    this.config.url = process.env.PLONE;
   }

  get(key: string) {
    return this.config[key];
  }
}
