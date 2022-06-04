import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { ArkBaseListItem, ArkBaseListWrapper } from '../../../components/ark-list/ark-list.component';
import { GenericResponse, GetAllUsersRequestParams, UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseSimpleList } from '../../../utils/base/ark-list';
import { BaseListComponent } from '../../../utils/base/base-list.component';

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
export class UsersListPage extends BaseSimpleList<UserDto, GetAllUsersRequestParams> {
    // usersList: DataListWrapper[] = [];
    // readonly columns = ['Nom', 'Prénom', 'Email', 'Phone', 'Rôles', 'Etat'];
    // selectAll = false;

    arkItems: ArkBaseListWrapper[] = [];

    constructor(
        readonly userService: UsersService,
        @Inject(TuiDialogService) public override readonly dialogService: TuiDialogService,
    ) {
        super('users', dialogService, false);
    }

    override async init() {
        await this.loadData();
    }


    public async loadCustomData(): Promise<GenericResponse> {
        return await firstValueFrom(this.userService.getAllUsers({
            search: this.request.search,
            length: this.request.length,
            order: this.request.order,
            orderby: this.request.orderby,
            start: this.request.start,
        }
        ));
    }

    public override createArkListWrapper() {
        this.arkItems = [];
        for (const item of this.items) {
            const itemsToPush: ArkBaseListItem[] = [];
            if (item.firstname && item.lastname) {
                itemsToPush.push({
                    label: item.firstname + ' ' + item.lastname.toUpperCase(),
                    tooltip: "Nom",
                    icon: "fa-user",
                });
            }

            if (item.mail) {
                itemsToPush.push({
                    label: item.mail,
                    tooltip: "Email",
                    icon: "fa-envelope",
                });
            }

            if (item.phone) {
                itemsToPush.push({
                    label: item.phone,
                    tooltip: "Téléphone",
                    icon: "fa-phone",
                });
            }

            this.arkItems.push({
                items: itemsToPush,
                entityId: item.id!,
                disabled: item.disabled,
            });
        }
    }


    async archiveItems(items: ArkBaseListWrapper[]) {
        (this.itemsChecked as any) = items.map(x => ({ id: x.entityId }));
        await this.removeSelectedItems(true, true);
    }
}