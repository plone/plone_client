import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Registry} from '../app/registry.ts';
import {Action} from '../../models/action';
import {ObjectService} from '../../services/object.service';
import {AuthUtils} from '../../injectors/authUtils';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'plone-toolbar',
  template: require('./toolbar.component.html')
})
export class Toolbar {
  actions: Action[] = [];
  factories: Action[] = [];
  transitions: Action[] = [];
  state = 'published';

  workflow: Action[] = [];
  authenticated = false;
  path = '';
  objectPath = '';
  folderPath = '';
  username = '';
  private _active = undefined;
  private routeSubscriber: any;

  constructor(private router: Router,
              private location: Location,
              private objectService: ObjectService,
              private authUtils: AuthUtils,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscriber = this.route.url.subscribe(urlPath => {
      this.authenticated = this.authUtils.isAuthenticated();
      if ( !this.authenticated ) {
        return;
      }
      this.username = this.authUtils.getUserInfo().username;

      this.path = urlPath.reduce(
        function(curr, prev) {return curr + '/' + prev.path}, '') || '/';
      this.path = this.path.split('/!!')[0];
      this.objectPath = this.path;
      this.folderPath = this.path;
      if (this.objectPath === '/') {
        // default page is front page...
        this.objectPath = '/front-page';
      }

      this.actions = [{
        title: 'View',
        uri: this.objectPath,
        category: 'view'
      }, {
        title: 'Edit',
        uri: this.objectPath + '/!!edit',
        category: 'edit'
      }];
      this.factories = [];

      this.objectService.actions(this.objectPath).subscribe(res => {
        let actions: Action[] = res.json().actions;
        actions.forEach(action => {
          if (action.category !== 'factories') {
            return;
          }
          // only care about content type
          let type = action['@id'];
          action.type = type;
          action.uri = this.objectPath + '/@@add?type=' + type;
          this.factories.push(action);
        });
      });

      this.transitions = [];
      this.objectService.getWorkflow(this.objectPath).subscribe(res => {
        let data = res.json();
        this.state = data.history[0].review_state;
        data.transitions.forEach(transition => {
          let parts = transition['@id'].split('/');
          transition.name = parts[parts.length - 1];
          this.transitions.push(transition);
        });
      });
    });
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
  }

  doTransition(transition: any) {
    this.objectService.doTransition(this.objectPath, transition.name).subscribe(res => {
      this.router.navigateByUrl(this.objectPath);
    });
  }

  isActive(category: string) {
    return this._active === category;
  }

  toggle(category: string) {
    if (this._active === category) {
      this._active = undefined;
    } else {
      this._active = category;
    }
  }
}

Registry.registerComponent('plone.toolbar', Toolbar);
