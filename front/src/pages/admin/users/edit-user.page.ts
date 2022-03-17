import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.page.html',
    styleUrls: ['./edit-user.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EditUserPage extends BaseComponent implements OnInit {
    user = {} as UserDto;
    backIcon = faAngleLeft;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UsersService,
        private dialogService: TuiDialogService,
    ) {
        super();
    }

    async ngOnInit() {
        let userId = '';
        this.route.params.subscribe((param) => {
            userId = param['id'];
        });
        this.user.disabled = false;
        if (userId !== 'new') {
            this.loading = true;
            const getUserResponse = await firstValueFrom(this.userService.getUser(userId));
            this.loading = false;
            if (!getUserResponse.success) {
                this.dialogService.open(getUserResponse.message!).subscribe();
                return;
            }
            this.user = getUserResponse.user;
        }
    }

    goBack() {
        this.router.navigate([this.RoutesList.AdminUsers]);
    }

    async save() {
        if (!this.hasPendingModifications)
            return
        this.loading = true;
        const saveResponse = await firstValueFrom(this.userService.createOrUpdateUser(this.user));
        this.loading = false;
        if (!saveResponse.success) {
            this.dialogService.open(saveResponse.message!).subscribe();
            return;
        }
        this.hasPendingModifications = false;
    }
}