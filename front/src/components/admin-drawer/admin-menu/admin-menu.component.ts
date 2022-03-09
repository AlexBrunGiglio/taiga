import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminMenuComponent extends BaseComponent {
    constructor() {
        super();
    }
}