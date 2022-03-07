import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { DashboardPage } from './dashboard.page';

const route: Routes = [{
    path: '',
    component: DashboardPage,
}]


@NgModule({
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
    ],
    declarations: [
        DashboardPage
    ],
    exports: [
        RouterModule
    ],
})
export class DashboardModule { }