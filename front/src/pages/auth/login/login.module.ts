import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiInputPasswordModule, TuiTabsModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../../app/app.module';
import { LoginPage } from './login.page';

const route: Routes = [{
    path: '',
    component: LoginPage,
}]

@NgModule({
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
        TuiInputPasswordModule,
        TuiSvgModule,
        TuiTabsModule,
    ],
    declarations: [LoginPage],
    exports: [RouterModule],
})
export class LoginModule { }
