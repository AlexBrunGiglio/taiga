import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
    selector: 'app-admin-drawer',
    templateUrl: './admin-drawer.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AdminDrawerComponent extends BaseComponent {
    constructor() {
        super();
    }
}