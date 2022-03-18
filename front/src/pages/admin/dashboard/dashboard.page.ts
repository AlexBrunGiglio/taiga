import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../providers/api-client.generated';
import { StatsService } from '../../../providers/api-client.generated/api/stats.service';
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
    userStat = 0;
    constructor(
        private userService: UsersService,
        private statService: StatsService,
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

    async loadStat() {
        const response = await firstValueFrom(this.statService.getStat('userStat'));
        this.userStat = response.stat?.value;
    }
}