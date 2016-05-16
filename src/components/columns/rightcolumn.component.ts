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

    components: { obj: any, klass: string }[] = [];

    constructor() { }

    ngOnInit() {
        this.components = [
            { obj: new PloneComponent(), klass: 'Logo' },
            { obj: new PloneComponent(), klass: 'Search' }
        ];
    }

}
