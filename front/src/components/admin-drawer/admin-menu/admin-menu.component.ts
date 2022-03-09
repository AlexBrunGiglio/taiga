import { Component, ViewEncapsulation } from '@angular/core';
import { faBug, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminMenuComponent extends BaseComponent {
    house = faHouse;
    users = faUsers
    logs = faBug;
    constructor() {
        super();
    }
}