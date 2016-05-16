import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {ObjectService} from '../../services/object.service';

@Component({
  selector: 'plone-navigation', // <app></app>
  directives: [],
  providers: [ObjectService],
  template: require('./navigation.component.html')
})
export class Navigation {
  items = [];

  constructor(private objectService: ObjectService) {}

  ngOnInit() {
    this.objectService.list('').subscribe(res => {
      this.items = res.json()['member'];
    });
  }

  public getUrl(item){
    // convert url since it is from the endpoint...
    var url = item['@id'];
    return '/' + url.split
  }
}
