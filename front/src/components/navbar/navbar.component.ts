import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
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