import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageModulesList } from '../../app/app.module';
import { ArkListComponent } from './ark-list.component';

@NgModule({
    declarations: [
        ArkListComponent,
    ],
    imports: [
        ...BasePageModulesList,
        RouterModule,
    ],
    exports: [
        ArkListComponent,
    ],
})
export class ArkListModule { }