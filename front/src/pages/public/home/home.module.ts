import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
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
        ...BasePageModulesList
    ],
    exports: [HomePage]
})
export class HomeModule { }