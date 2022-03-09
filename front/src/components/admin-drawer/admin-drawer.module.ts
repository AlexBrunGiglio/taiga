import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';
import { BasePageModulesList } from '../../app/app.module';
import { NavbarModule } from '../navbar/navbar.module';
import { AdminDrawerComponent } from './admin-drawer.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

@NgModule({
    imports: [
        ...BasePageModulesList,
        TuiSvgModule,
        RouterModule,
        NavbarModule,
    ],
    declarations: [
        AdminNavbarComponent,
        AdminMenuComponent,
        AdminDrawerComponent
    ],
    exports: [AdminDrawerComponent],
})
export class AdminDrawerModule { }