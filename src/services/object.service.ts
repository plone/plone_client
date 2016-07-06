import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {APIService} from './api.service';
import {ConfigurationService} from './configuration.service';


@Injectable()
export class ObjectService extends APIService {

  constructor(
    public http: Http,
    private configuration: ConfigurationService
  ) {
    super(http);
  }

  get (path: string) {
    let url = this.configuration.get('url') + path;
    let headers = this.getHeaders();
    return this.http.get(url, {headers: headers});
  }

  actions(path: string) {
    let url = this.configuration.get('url') + path + '/@actions';
    let headers = this.getHeaders();
    return this.http.get(url, {headers: headers});
  }

  put(path: string, data: any) {
    let url = this.configuration.get('url') + path;
    let headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(data);

    return this.http.patch(url, body, {
      headers: headers
    });
  }

  create(path: string, data: any) {
    let url = this.configuration.get('url') + path;
    let headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(data);

    return this.http.post(url, body, {
      headers: headers
    });
  }

  list(path: string) {
    // get a listing of a path
    let url = this.configuration.get('url') + '/search';
    let headers = this.getHeaders();

    if (path && path[0] !== '/') {
      path = '/' + path;
    }
    let query = '?path.query=/Plone' + path + '&path.depth=1&metadata_fields=_all&sort_order=getObjPositionInParent';

    return this.http.get(url + query, {
      headers: headers
    });
  }


  getWorkflow(path: string) {
    // get a listing of a path
    let url = this.configuration.get('url') + path + '/workflow';
    let headers = this.getHeaders();

    return this.http.get(url, { headers: headers });
  }

  doTransition(path: string, transition: string) {
    let url = this.configuration.get('url') + path + '/workflow/' + transition;
    let headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({});

    return this.http.post(url, body, { headers: headers });
  }

  schema(path: string) {
    let headers = this.getHeaders();

    return this.http.get(path, {
      headers: headers
    });
  }

}
