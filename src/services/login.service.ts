import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import {ConfigurationService} from './configuration.service';


@Injectable()
export class LoginService {

  constructor(
    public http: Http,
    private configuration: ConfigurationService
  ){}

  login(username: string, password: string){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    var body = JSON.stringify({
      username: username,
      password: password
    });
    return this.http.post(
      this.configuration.get('url') + '/@login', body, {headers: headers});
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
