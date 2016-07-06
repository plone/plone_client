import {Component, EventEmitter, Output} from '@angular/core';
import {PloneComponent} from '../plonecomponent/plonecomponent.component';
import {Registry} from '../app/registry.ts';

@Component({
  selector: 'plone-example-content',
  template: require('./example.component.html')
})
export class ExampleComponent {}

Registry.registerComponent('plone.news', ExampleComponent);

@Component({
    selector: 'plone-column-manager',
    directives: [
        PloneComponent
    ],
    template: require('./columnmanager.component.html')
})
export class ColumnManager {

    @Output() onChangeContent = new EventEmitter<string>();
    component = '';
    options = ['plone.logo', 'plone.search', 'plone.news'];

    constructor() {
    }

    addComponent() {
      this.onChangeContent.emit(this.component);
    }
}
