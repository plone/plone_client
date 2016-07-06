import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export class APIService {

  constructor(public http: Http) { }

  public getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let auth = localStorage.getItem('auth');
    if (auth) {

      // TODO Do I need to mention this needs to be replaced?
      // Just faking auth until tokens are set up
      headers.append('Authorization', 'basic ' + btoa('admin:admin'));
      // headers.append('Authorization', auth);
    }
    return headers;
  }

  public handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
