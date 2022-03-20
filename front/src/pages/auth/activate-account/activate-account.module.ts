import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { ActivateAccountPage } from './activate-account.page';

const route: Routes = [{
    path: '',
    component: ActivateAccountPage,
}]

@NgModule({
    imports: [
        BasePageModulesList,
        RouterModule.forChild(route),
    ],
    declarations: [
        ActivateAccountPage
    ],
    exports: [RouterModule],
})
export class ActivateAccountModule { }