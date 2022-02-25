import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { RegisterPage } from './register.page';

const route: Routes = [{
    path: '',
    component: RegisterPage,
}]

@NgModule({
    imports: [
        ...BasePageModulesList
    ],
    exports: [],
    declarations: [RegisterPage],
    providers: [],
})
export class RegisterModule { }
