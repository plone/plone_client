import {Component, Renderer} from '@angular/core';
import {Http, Headers} from '@angular/http';
import TitleTile from '../title-tile/title-tile.component';
import {Router} from '@angular/router';
import {Model} from '../../models/document';
import {ObjectService} from '../../services/object.service';
import {Header} from '../header/header.component';
import {Breadcrumbs} from '../breadcrumbs/breadcrumbs.component';
import {Toolbar} from '../toolbar/toolbar.component';
import {RightColumn} from '../columns/rightcolumn.component';
import {Footer} from '../footer/footer.component';
import {Navigation} from '../navigation/navigation.component';
import {Location} from '@angular/common';


@Component({
  selector: 'edit',
  directives: [
    TitleTile,
    Header,
    TitleTile,
    Footer,
    Navigation,
    Toolbar,
    Breadcrumbs,
    RightColumn
  ],
  providers: [ObjectService],
  template: require('./edit.component.html')
})
export class Edit {
  model: Model = {
    title: '',
    description: '',
    text: {
      data: '',
      encoding: '',
      'content-type': ''
    }
  };
  path = '';

  constructor(private objectService: ObjectService,
              private router: Router,
            private location: Location) {
    this.path = this.location.path() || 'front-page';
    this.path = this.path.split('/@@')[0];
  }

  ngOnInit() {
    this.objectService.get(this.path).subscribe(res => {
      this.model = res.json();
    });
  }

  onSave() {
    // only care about editable things...
    var data = {
      '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
      '@id': 'http://castanyera.iskra.cat:8070/news/foobar',
      'title': this.model.title,
      'description': this.model.description
    };
    if(this.model.text){
      data['text'] = this.model.text;
    }

    this.objectService.put(this.path, data).subscribe(res => {
      this.router.navigate(['front-page']);
    });
  }

  onCancel() {
    this.router.navigate(['front-page']);
  }
}
