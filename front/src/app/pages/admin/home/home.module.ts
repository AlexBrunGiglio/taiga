import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { AdminDrawerModule } from "../../../components/admin-drawer/admin-drawer.module";
import { HomeComponent } from "./home.component";

const routes = [{
    path: '',
    component: HomeComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
        AdminDrawerModule,
    ],
    declarations: [
        HomeComponent,
    ],
    exports: [RouterModule],
})
export class HomeAdminModule { }