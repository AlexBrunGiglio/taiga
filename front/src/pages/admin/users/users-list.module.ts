import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TUI_CHECKBOX_DEFAULT_OPTIONS, TUI_CHECKBOX_OPTIONS } from '@taiga-ui/core';
import { TuiCheckboxModule, TuiPaginationModule, TuiTagModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../../app/app.module';
import { AdminDrawerModule } from '../../../components/admin-drawer/admin-drawer.module';
import { UsersListPage } from './users-list.page';

const route: Routes = [{ path: '', component: UsersListPage }];

@NgModule({
    imports: [
        ...BasePageModulesList,
        RouterModule.forChild(route),
        AdminDrawerModule,
        TuiTableModule,
        TuiPaginationModule,
        TuiTagModule,
        TuiCheckboxModule,
        TuiTablePaginationModule,
    ],
    declarations: [UsersListPage],
    exports: [RouterModule],
    providers: [{
        provide: TUI_CHECKBOX_OPTIONS,
        useValue: {
            ...TUI_CHECKBOX_DEFAULT_OPTIONS,
            size: 'm'
        }
    }],
})
export class UsersListModule { }