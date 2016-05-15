import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {RouteParams, Router} from '@angular/router-deprecated';
import {Document} from '../../models/document';


@Component({
  selector: 'edit',
  directives: [
    TitleTile,
  ],
  template: require('./edit.component.html')
})
export class Edit {
  model: Document = {
    title: '',
    description: '',
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };
  path = '';

  constructor(public http: Http, _params: RouteParams,
              private router: Router) {
    this.path = _params.get('1') || 'front-page';
  }

  ngOnInit() {
    var url = 'http://admin:admin@castanyera.iskra.cat:8070/' + this.path;
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    this.http.get(url, {
      headers: headers
    }).subscribe(res => {
      this.model = res.json();
    });
  }

  onSave() {
    var url = 'http://castanyera.iskra.cat:8070/' + this.path;
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa('admin:admin'));

    var body = JSON.stringify({
      '@context': '/@@context.jsonld',
      '@type': 'Document',
      'title': this.model.title,
      'description': this.model.description,
      'text': this.model.text.data
    });

    this.http.patch(url, body, {
      headers: headers
    }).subscribe(res => {
      this.router.navigateByUrl('/' + this.path);
    });
  }

  onCancel() {
    this.router.navigateByUrl('/' + this.path);
  }
}
