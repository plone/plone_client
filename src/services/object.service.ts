import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'


@Injectable()
export class ObjectService {
  url = 'http://castanyera.iskra.cat:8070';

  constructor(public http: Http){}

  private getHeaders(): Headers {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    if(btoa){
      headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
    }
    return headers;
  }

  get(path:string) {
    var url = this.url + '/' + path;
    var headers = this.getHeaders();
    return this.http.get(url, {headers: headers});
  }

  put(path:string, data: any) {
    var url = this.url + '/' + path;
    var headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');

    var body = JSON.stringify(data);

    return this.http.patch(url, body, {
      headers: headers});
  }

  create(path:string, data: any) {
    var url = this.url + '/' + path;
    var headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    var body = JSON.stringify(data);

    return this.http.post(url, body, {
      headers: headers});
  }

  list(path:string) {
    // get a listing of a path
    var url = this.url + '/search';
    var headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');

    if(path && path[0] !== '/'){
      path = '/' + path
    }
    var query = '?path.query=/Plone' + path + '&path.depth=1&metadata_fields=_all&sort_order=getObjPositionInParent';

    return this.http.get(url + query, {
      headers: headers});
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
