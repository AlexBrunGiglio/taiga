import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    userStat = 0;
    constructor(
        private userService: UsersService,
        private statService: StatsService,
    ) {
        super();
    }

    async ngOnInit() {
        await this.loadUsers();
        await this.loadStat();
    }

    async loadUsers() {
        const userResponse = await firstValueFrom(this.userService.getAllUsers({}));
        this.userLenght = userResponse.users?.length.toString() || 'n/A';
    }

    async loadStat() {
        const response = await firstValueFrom(this.statService.getStat({ label: 'userStat' }));
        if (typeof this.userLenght === 'number') {
            this.userStat = this.userLenght - response.stat?.value;
        }
    }
}