import {Component, Input} from '@angular/core';
import {Registry} from '../app/registry.ts';

@Component({
  selector: 'title-tile',
  template: require('./title-tile.component.html'),
})
export class TitleTile {
  @Input() title;
}

Registry.registerComponent('plone.title', TitleTile);
