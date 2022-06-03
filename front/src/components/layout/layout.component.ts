import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends BaseComponent {
    constructor() {
        super();
    }
}