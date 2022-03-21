import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { TuiContextWithImplicit, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { UserDto, UserRoleDto, UsersRolesService, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.page.html',
    styleUrls: ['./edit-user.page.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserPage extends BaseComponent implements OnInit {
    user = {} as UserDto;
    backIcon = faAngleLeft;
    userRolesList = [] as UserRoleDto[];
    tempUserRole = 'admin';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UsersService,
        private dialogService: TuiDialogService,
        private userRoleService: UsersRolesService,
    ) {
        super();
        this.init();
    }

    async init() {
        let userId = '';
        this.route.params.subscribe((param) => {
            userId = param['id'];
        });
        this.user.disabled = false;
        this.loading = true;
        if (userId === 'new') {
            this.loading = false;
            return;
        }
        const getUserResponse = await firstValueFrom(this.userService.getUser(userId));
        const getRolesResponse = await firstValueFrom(this.userRoleService.getUserRoles());
        this.loading = false;
        if (!getRolesResponse.success) {
            this.dialogService.open(getRolesResponse.message!).subscribe();
        }
        this.userRolesList = getRolesResponse.userRoles;
        if (!getUserResponse.success) {
            this.dialogService.open(getUserResponse.message!).subscribe();
        }
        this.user = getUserResponse.user;
    }

    async ngOnInit() {

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

    readonly stringify: TuiStringHandler<UserRoleDto | TuiContextWithImplicit<UserRoleDto>> = item =>
        'role' in item ? item.label! : item.$implicit.role;

    readonly identityMatcher: TuiIdentityMatcher<UserRoleDto> = (roleA, roleB) =>
        roleA.id === roleB.id;

}