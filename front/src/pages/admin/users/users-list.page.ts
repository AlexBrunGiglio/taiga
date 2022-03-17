import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom, Subject } from 'rxjs';
import { UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseListComponent } from '../../../utils/base/base-list.component';
import { BaseComponent, BaseRequest } from '../../../utils/base/base.component';

interface DataListWrapper {
    selected: boolean;
    user: UserDto;
}
@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UsersListPage extends BaseListComponent implements OnInit {
    usersList: DataListWrapper[] = [];
    readonly columns = ['Nom', 'Prénom', 'Email', 'Phone', 'Rôles', 'Etat'];
    selectAll = false;
    refresh = faRefresh;
    constructor(
        readonly userService: UsersService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {
        super();
    }

    override async loadData() {
        this.usersList = [];
        this.loading = true;
        const getAllUsers = await firstValueFrom(this.userService.getAllUsers(
            this.request.start,
            this.request.length,
            this.request.orderby,
            this.request.order,
            this.request.search
        ));
        if (!getAllUsers.success) {
            this.dialogService.open(getAllUsers.message!, { label: 'Une erreur est survenue' }).subscribe();
        }
        for (const user of getAllUsers.users) {
            this.usersList.push({ selected: false, user: user });
        }
        this.loading = false;
    }

    async ngOnInit() {
        await this.loadData();
    }

    async remove() {
        const selectedItems = this.usersList.filter(x => x.selected);
        this.loading = true;
        this.usersList = this.usersList.filter(x => !x.selected);
        const removeUsers = await firstValueFrom(this.userService.deleteUsers(selectedItems.map(x => x.user.id).join(',')));
        this.loading = false;
        if (!removeUsers.success) {
            this.dialogService.open(removeUsers.message!).subscribe();
            return;
        }
    }

    onSelectAllItem() {
        if (this.selectAll)
            this.usersList.forEach((item) => {
                item.selected = true;
            });
        else
            this.usersList.forEach((item) => {
                item.selected = false;
            });
    }

    async refreshData() {
        await this.loadData();
    }
}