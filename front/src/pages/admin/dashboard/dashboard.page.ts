import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardPage extends BaseComponent implements OnInit {
    userLenght = '';
    users = faUsers;
    constructor(
        private userService: UsersService,
    ) {
        super();
    }

    async ngOnInit() {
        await this.loadUsers();
    }

    async loadUsers() {
        const userResponse = await firstValueFrom(this.userService.getAllUsers());
        this.userLenght = userResponse.users?.length.toString() || 'n/A';
    }
}