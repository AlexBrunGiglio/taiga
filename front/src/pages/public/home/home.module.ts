import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { NavbarModule } from '../../../components/navbar/navbar.module';
import { TableModule } from '../../../components/tables/table.module';
import { HomePage } from './home.page';

const route: Routes = [
    {
        path: '',
        component: HomePage,
    }
]

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
        NavbarModule,
        TableModule,
    ],
    exports: [RouterModule],
})
export class HomeModule { }