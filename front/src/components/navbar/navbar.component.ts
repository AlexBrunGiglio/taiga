import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ width: 0 }),
                        animate('500ms ease-out',
                            style({ width: '30%' }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ width: '30%' }),
                        animate('500ms ease-in',
                            style({ width: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class NavbarComponent implements OnInit {
    showMenuVar = false;
    constructor() {
    }

    ngOnInit() {
        //
    }

    showMenu() {
        this.showMenuVar = !this.showMenuVar;
    }
}