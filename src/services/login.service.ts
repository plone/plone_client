import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ConfigurationService} from './configuration.service';
import {AuthUtils} from '../injectors/authUtils';


@Injectable()
export class LoginService {

  constructor(
    public http: Http,
    private configuration: ConfigurationService,
    private authUtils: AuthUtils
  ) {}

  login(login: string, password: string) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({
      login: login,
      password: password
    });
    this.http.post(
      this.configuration.get('url') + '/@login', body, {headers: headers}).subscribe(res => {
        console.log("login now");
        let data = res.json();
        if (data.token) {
          localStorage.setItem('auth', data.token);
          this.authUtils.isAuthenticated.next(true);
        } else {
          localStorage.removeItem('auth');
          this.authUtils.isAuthenticated.next(false);
        }
      });
  }

  logout() {
    // Since we're using JWT, the logout is done exclusively
    // on the client.
    localStorage.removeItem('auth');
    this.authUtils.isAuthenticated.next(false);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
