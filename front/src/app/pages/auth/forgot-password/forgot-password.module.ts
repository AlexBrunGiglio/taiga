import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { ForgotPasswordComponent } from "./forgot-password.component";

const routes = [{
    path: '',
    component: ForgotPasswordComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        ForgotPasswordComponent,
    ],
    exports: [RouterModule],
})
export class ForgotPasswordModule { }