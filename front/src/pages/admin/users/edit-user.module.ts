import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiCheckboxModule, TuiDataListWrapperModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../../app/app.module';
import { AdminDrawerModule } from '../../../components/admin-drawer/admin-drawer.module';
import { EditUserPage } from './edit-user.page';

const route: Routes = [{ path: '', component: EditUserPage }];

@NgModule({
    imports: [
        ...BasePageModulesList,
        AdminDrawerModule,
        RouterModule.forChild(route),
        TuiInputPasswordModule,
        TuiCheckboxModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
    ],
    declarations: [EditUserPage],
    exports: [RouterModule],
})
export class EditUserModule { }
