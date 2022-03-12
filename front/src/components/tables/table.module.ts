import { NgModule } from '@angular/core';
import { BasePageModulesList } from '../../app/app.module';
import { TableComponent } from './table.component';

@NgModule({
    declarations: [
        TableComponent,
    ],
    exports: [TableComponent]
})
export class TableModule { }