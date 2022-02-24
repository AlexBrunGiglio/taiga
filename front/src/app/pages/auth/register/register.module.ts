import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { RegisterComponent } from "./register.component";

const routes = [{
    path: '',
    component: RegisterComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [RouterModule],
})
export class RegisterModule { }