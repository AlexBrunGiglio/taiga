import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';
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
        TuiToggleModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule { }