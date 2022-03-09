import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { AdminDrawerModule } from '../../../components/admin-drawer/admin-drawer.module';
import { UsersListPage } from './users-list.page';

const route: Routes = [{ path: '', component: UsersListPage }];

@NgModule({
    imports: [
        ...BasePageModulesList,
        RouterModule.forChild(route),
        AdminDrawerModule
    ],
    declarations: [UsersListPage],
    exports: [RouterModule]
})
export class UsersListModule { }