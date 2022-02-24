import { NgModule } from "@angular/core";
import { AdminDrawerComponent } from "./admin-drawer.component";
import { AdminSidebarComponent } from "./menu/admin-menu.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatIconModule,
        RouterModule,
    ],
    declarations: [
        AdminDrawerComponent,
        AdminSidebarComponent,
    ],
    exports: [
        AdminDrawerComponent,
    ],
})

export class AdminDrawerModule { }