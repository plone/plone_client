import {Component, Input} from '@angular/core';

@Component({
  selector: 'title-tile',
  template: require('./title-tile.component.html'),
})
export default class TitleTile {
  @Input() title;
}
