import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardPage extends BaseComponent {
    constructor() {
        super();
    }
}