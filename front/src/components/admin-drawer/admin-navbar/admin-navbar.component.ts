import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AdminNavbarComponent extends BaseComponent implements OnInit {
    innerWidth: any;
    constructor() {
        super();
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.innerWidth = window.innerWidth;
        console.log("🚀 ~ AdminNavbarComponent ~ onResize ~ this.innerWidth", this.innerWidth);
    }
    ngOnInit() {
        this.innerWidth = window.innerWidth;
        console.log("🚀 ~ AdminNavbarComponent ~ ngOnInit ~ this.innerWidth", this.innerWidth);
    }

    haveToShowAdminMenu(): boolean {
        if (this.innerWidth <= 650)
            return true;
        else
            return false;
    }
}