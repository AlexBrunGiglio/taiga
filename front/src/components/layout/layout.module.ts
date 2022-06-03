import { NgModule } from '@angular/core';
import { BasePageModulesList } from '../../app/app.module';
import { NavbarModule } from '../navbar/navbar.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        ...BasePageModulesList,
        NavbarModule,
    ],
    declarations: [
        LayoutComponent,
    ],
    exports: [
        LayoutComponent
    ],
})
export class LayoutModule {
}