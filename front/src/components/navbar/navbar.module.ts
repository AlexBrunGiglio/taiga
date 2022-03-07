import { NgModule } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { BasePageModulesList } from '../../app/app.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        ...BasePageModulesList,
        TuiSvgModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule { }