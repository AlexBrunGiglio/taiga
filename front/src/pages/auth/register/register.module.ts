import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiInputPasswordModule, TuiStepperModule, TuiTabsModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../../app/app.module';
import { RegisterPage } from './register.page';

const route: Routes = [{
    path: '',
    component: RegisterPage,
}]

@NgModule({
    imports: [
        RouterModule.forChild(route),
        ...BasePageModulesList,
        TuiInputPasswordModule,
        TuiTabsModule,
        TuiSvgModule
    ],
    declarations: [RegisterPage],
    exports: [RouterModule],
})
export class RegisterModule { }
