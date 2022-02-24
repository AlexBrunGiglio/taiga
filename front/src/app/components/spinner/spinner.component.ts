import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "../../base/base.component";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class SpinnerComponent extends BaseComponent {
    constructor() {
        super();
    }
}