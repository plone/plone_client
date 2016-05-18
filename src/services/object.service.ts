import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import {APIService} from './api.service';


@Injectable()
export class ObjectService extends APIService {

  constructor(public http: Http){
    super(http);
  }

  get(path:string) {
    var url = this.url + path;
    var headers = this.getHeaders();
    return this.http.get(url, {headers: headers});
  }

  actions(path:string){
    var url = this.url + path + '/actions_';
    var headers = this.getHeaders();
    return this.http.get(url, {headers: headers});
  }

  put(path:string, data: any) {
    var url = this.url + path;
    var headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');

    var body = JSON.stringify(data);

    return this.http.patch(url, body, {
      headers: headers});
  }

  create(path:string, data: any) {
    var url = this.url + path;
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

    if(path && path[0] !== '/'){
      path = '/' + path
    }
    var query = '?path.query=/Plone' + path + '&path.depth=1&metadata_fields=_all&sort_order=getObjPositionInParent';

    return this.http.get(url + query, {
      headers: headers});
  }

  getWorkflow(path:string){
    // get a listing of a path
    var url = this.url + path + '/workflow';
    var headers = this.getHeaders();

    return this.http.get(url, {headers: headers});
  }

  doTransition(path:string, transition: string){
    var url = this.url + path + '/workflow/' + transition;
    var headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    var body = JSON.stringify({});

    return this.http.post(url, body, {headers: headers});
  }
}
