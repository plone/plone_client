import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: '.plone-footer', // <app></app>
  directives: [],
  template: require('./footer.component.html')
})
export class Footer {
  constructor(private location: Location) {
  }

}
