import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiInputPasswordModule, TuiTabsModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../../app/app.module';
import { NavbarModule } from '../../../components/navbar/navbar.module';
import { ProfilePage } from './profile.page';

const route: Routes = [{
    path: '',
    component: ProfilePage,
}]

@NgModule({
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
        TuiInputPasswordModule,
        TuiTabsModule,
        TuiSvgModule,
        NavbarModule,
    ],
    declarations: [ProfilePage],
    exports: [RouterModule],
})
export class ProfileModule { }