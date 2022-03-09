import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminNavbarComponent extends BaseComponent {
    constructor() {
        super();
    }
}