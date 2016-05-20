import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  config = {
    // url: 'http://castanyera.iskra.cat:8070/Plone/login_'
    url: 'http://localhost:8080:Plone'
  }

  constructor() { }

  get(key: string) {
    return this.config[key];
  }
}
