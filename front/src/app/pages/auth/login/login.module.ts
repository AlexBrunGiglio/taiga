import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { LoginComponent } from "./login.component";

const routes = [{
    path: '',
    component: LoginComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        LoginComponent
    ],
    exports: [RouterModule],
})
export class LoginModule { }