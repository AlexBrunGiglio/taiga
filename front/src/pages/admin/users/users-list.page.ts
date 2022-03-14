import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UsersListPage extends BaseComponent implements OnInit {
    columns = ['lastname', 'firstname', 'mail', 'phone', 'creationDate', 'disabled'];
    users: UserDto[] = [];
    constructor(
        readonly userService: UsersService,
    ) {
        super();
        this.init();
    }

    async init() {
        this.loading = true;
        const getAllUsers = await firstValueFrom(this.userService.getAllUsers());
        this.loading = false;

        this.users = getAllUsers.users;
    }

    async ngOnInit() {
    }
}