import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageModulesList } from '../../../app/app.module';
import { HomePage } from './home.page';

const route = [
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