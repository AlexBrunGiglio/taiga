import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss']
})
export class UsersListPage extends BaseComponent implements OnInit {
    constructor() {
        super();
    }
    ngOnInit(): void {

    }
}