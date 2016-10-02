import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {Registry} from '../app/registry.ts';
import {Router} from '@angular/router';


@Component({
  selector: 'plone-search',
  template: require('./search.component.html')
})
export class Search {
  q = '';

  constructor(private router: Router) { }

  onSubmit() {
    // pass off to the search page now...
    this.router.navigateByUrl('/!!search/' + this.q);
  }
}

Registry.registerComponent('plone.search', Search);
