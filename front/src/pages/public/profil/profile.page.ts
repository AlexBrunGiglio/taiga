import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDialogService, TuiNotificationsService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';
import { AuthDataService } from '../../../utils/services/auth-data.service';

interface PictureWrapper {
    path: string;
    selected: boolean;
}
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfilePage extends BaseComponent implements OnInit {
    activeItemIndex = 1;
    userDto = {} as UserDto;
    userForm: any;
    modifDateString = '';
    imagesList = [
        { path: '/assets/img/boy-1.png', selected: false },
        { path: '/assets/img/boy-2.png', selected: false },
        { path: '/assets/img/boy-3.png', selected: false },
        { path: '/assets/img/boy-4.png', selected: false },
        { path: '/assets/img/girl-1.png', selected: false },
        { path: '/assets/img/girl-2.png', selected: false },
        { path: '/assets/img/girl-3.png', selected: false },
        { path: '/assets/img/girl-4.png', selected: false },
    ] as PictureWrapper[];
    constructor(
        private userService: UsersService,
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {
        super();
    }

    async ngOnInit() {
        this.loading = true;
        const userResponse = await firstValueFrom(this.userService.getUser(AuthDataService.currentUser?.id!));
        this.loading = false;
        if (!userResponse.success) {
            this.notifications.show(userResponse.message!);
            return;
        }
        this.userDto = userResponse.user;
        const tempDate = new Date(this.userDto.modifDate!);
        this.modifDateString = tempDate.toLocaleDateString().toString()!;
    }

    selectProfilePicture(picture: PictureWrapper) {
        this.imagesList.forEach((picture) => {
            picture.selected = false;
        });
        picture.selected = !picture.selected;
    }
}