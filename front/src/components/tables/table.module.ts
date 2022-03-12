import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TuiButtonModule, TuiDialogModule, TuiLoaderModule, TuiTableModeModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../app/app.module';
import { TableComponent } from './table.component';

@NgModule({
    imports: [
        TuiTableModeModule,
        CommonModule,
        FontAwesomeModule,
        TuiLoaderModule,
        TuiDialogModule,
        TuiActionModule,
        TuiButtonModule,
    ],
    declarations: [
        TableComponent,
    ],
    exports: [TableComponent]
})
export class TableModule { }