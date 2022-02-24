import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "../../base/base.component";

@Component({
    selector: 'app-drawer-admin-container',
    templateUrl: './admin-drawer.component.html',
    styleUrls: ['./admin-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AdminDrawerComponent extends BaseComponent {
    constructor() {
        super();
    }
}