import {Component} from '@angular/core';
import {ObjectService} from '../../services/object.service';
import {Router} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'plone-navigation', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
  ],
  providers: [ObjectService],
  template: require('./navigation.component.html')
})
export class Navigation {
  items = [];

  constructor(private router: Router, private objectService: ObjectService) { }

  ngOnInit() {
    this.objectService.list('').subscribe(res => {
      this.items = res.json()['member'];
    });
  }

}
