import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {APIService} from './api.service';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class SearchService extends APIService {

  constructor(
    public http: Http,
    private configuration: ConfigurationService
  ) {
    super(http);
  }

  search(q:string, sort: string='', reversed: boolean=false) {
    // get a listing of a path
    var url = this.configuration.get('url') + '/@search';
    var headers = this.getHeaders();
    var query = '?SearchableText=' + q + '&metadata_fields=_all';
    if(sort){
      query += '&sort_on=' + sort;
    }
    if(reversed){
      query += '&sort_order=reversed';
    }

    return this.http.get(url + query, {
      headers: headers});
  }

}
