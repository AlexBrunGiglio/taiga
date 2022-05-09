import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatComponent extends BaseComponent implements OnInit {
    message!: string;
    constructor() {
        super();
    }

    ngOnInit(): void {

    }
}