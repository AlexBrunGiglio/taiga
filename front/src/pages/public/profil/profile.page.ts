import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TuiDialogService, TuiNotificationsService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';
import { AuthDataService } from '../../../utils/services/auth-data.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.html'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfilePage extends BaseComponent implements OnInit {
    userDto = {} as UserDto;
    constructor(
        private userService: UsersService,
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {
        super();
    }

    async ngOnInit() {
        const userResponse = await firstValueFrom(this.userService.getUser(AuthDataService.currentUser?.id!));
        if (!userResponse.success) {
            this.notifications.show(userResponse.message!);
            return;
        }
        this.userDto = userResponse.user;
    }
}