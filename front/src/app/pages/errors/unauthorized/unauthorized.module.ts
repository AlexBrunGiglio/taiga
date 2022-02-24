import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { UnauthorizedComponent } from "./unauthorized.component";

const routes = [{
    path: '',
    component: UnauthorizedComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        UnauthorizedComponent,
    ],
    exports: [RouterModule],
})
export class UnauthorizedModule { }