import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { LayoutModule } from '../../../components/layout/layout.module';
import { NavbarModule } from '../../../components/navbar/navbar.module';
import { HomePage } from './home.page';

const route: Routes = [
    {
        path: '',
        component: HomePage,
    }
];

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
        LayoutModule,
    ],
    exports: [RouterModule],
})
export class HomeModule { }