import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../app.module";
import { NotFoundComponent } from "./not-found.component";

const routes = [{
    path: '',
    component: NotFoundComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        NotFoundComponent,
    ],
    exports: [RouterModule],
})
export class NotFoundModule { }