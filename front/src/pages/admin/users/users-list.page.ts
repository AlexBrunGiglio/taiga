import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss']
})
export class UsersListPage extends BaseComponent implements OnInit {
    columns = ['lastname', 'firstname', 'mail', 'initial', 'lastname', 'lastname'];
    users = [{
        lastname: 'didier',
        firstname: 'philippe'
    },
    {
        lastname: 'didier',
        firstname: 'philippe'
    }] as UserDto[];
    constructor() {
        super();
    }
    ngOnInit(): void {

    }
}