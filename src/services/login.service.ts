import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'


@Injectable()
export class LoginService {
  url = '/login';

  constructor(public http: Http){}

  login(username: string, password: string){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    var body = JSON.stringify({
      username: username,
      password: password
    });
    return this.http.post(this.url, body, {headers: headers});
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
