import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { InternalServerComponent } from "./internal-server.component";

const routes = [{
    path: '',
    component: InternalServerComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        InternalServerComponent,
    ],
    exports: [RouterModule],
})
export class InternalServerModule { }