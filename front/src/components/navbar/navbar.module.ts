import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { BasePageModulesList } from '../../app/app.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        ...BasePageModulesList,
        TuiSvgModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        RouterModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule { }