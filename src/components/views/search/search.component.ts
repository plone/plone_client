import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../../title-tile/title-tile.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';
import {ObjectUtility} from '../../../injectors/object';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DoCheck, SimpleChange} from '@angular/core';


@Component({
  selector: 'plone-view-search',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  providers: [SearchService, ObjectUtility],
  template: require('./search.component.html')
})
export class Search{
  q = '';
  previousQ = '';
  resultsQ = '';
  sort = '';
  reversed = false;
  results = [];
  timeout = null;

  constructor(private router: Router,
              private location: Location,
              private searchService: SearchService,
              public utility: ObjectUtility) {
  }

  ngOnInit() {
    var path = this.location.path();
    if(path.indexOf('@@search/') !== -1){
      var splitpath = path.split('@@search/');
      this.q = splitpath[splitpath.length - 1];
      this.search();
    }
  }

  ngDoCheck(){
    if(this.previousQ !== this.q){
      // changed
      this.previousQ = this.q;
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.search();
      }, 300);
    }
  }

  sortBy(sort: string, reversed: boolean){
    this.sort = sort;
    this.reversed = reversed
    this.search();
  }

  search() {
    var searchQ = this.q;
    if(!this.q){
      this.results = [];
    }
    this.searchService.search(this.q, this.sort, this.reversed).subscribe(res => {
      this.results = res.json()['member'];
      this.resultsQ = searchQ;
    });
  }
}
