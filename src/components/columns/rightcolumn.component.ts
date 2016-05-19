import {Component} from '@angular/core';
import {PloneComponent} from '../plonecomponent/plonecomponent.component';
import {ColumnManager} from '../columnmanager/columnmanager.component';

@Component({
    selector: 'plone-right-column',
    directives: [
        PloneComponent,
        ColumnManager
    ],
    template: require('./rightcolumn.component.html')
})
export class RightColumn {

    components: { obj: any, name: string }[] = [];

    constructor() { }

    updateComponents($event) {
      this.components.push({ obj: new PloneComponent(), name: $event});
    }

    ngOnInit() {
        this.components = [
        ];
    }

}
