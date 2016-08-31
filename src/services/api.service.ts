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
      headers.append('Authorization', 'Bearer ' + auth);
    }
    return headers;
  }

  public handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
