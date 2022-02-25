import { Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterPage extends BaseComponent {
    constructor() {
        super();
        console.log("ECHO")
    }
}