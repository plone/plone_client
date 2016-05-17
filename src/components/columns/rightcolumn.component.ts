import {Component} from '@angular/core';
import {PloneComponent} from '../plonecomponent/plonecomponent.component';

@Component({
    selector: 'plone-right-column',
    directives: [
        PloneComponent
    ],
    template: require('./rightcolumn.component.html')
})
export class RightColumn {

    components: { obj: any, name: string }[] = [];

    constructor() { }

    ngOnInit() {
        this.components = [
            { obj: new PloneComponent(), name: 'plone.logo' },
            { obj: new PloneComponent(), name: 'plone.search' }
        ];
    }

}
