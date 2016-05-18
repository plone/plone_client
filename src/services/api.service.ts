import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'


export class APIService {
  url = 'http://castanyera.iskra.cat:8070/Plone';

  constructor(public http: Http){}

  public getHeaders(): Headers {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    var auth = localStorage.getItem('auth');
    if(auth){
      headers.append('Authorization', auth);
    }
    return headers;
  }

  public handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
