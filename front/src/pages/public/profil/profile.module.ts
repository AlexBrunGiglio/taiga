import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TuiSvgModule, TuiTextfieldControllerModule, TuiTextfieldLabelOutsideDirective } from '@taiga-ui/core';
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
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
    ],
    declarations: [ProfilePage],
    exports: [RouterModule],
})
export class ProfileModule { }