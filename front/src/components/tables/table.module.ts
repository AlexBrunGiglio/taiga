import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiDialogModule, TuiLoaderModule, TUI_CHECKBOX_DEFAULT_OPTIONS, TUI_CHECKBOX_OPTIONS } from '@taiga-ui/core';
import { TuiActionModule, TuiCheckboxModule } from '@taiga-ui/kit';
import { TableComponent } from './table.component';
@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        TuiLoaderModule,
        TuiDialogModule,
        TuiActionModule,
        TuiButtonModule,
        TuiCheckboxModule,
        FormsModule,
        TuiTablePaginationModule,
        RouterModule,
    ],
    declarations: [
        TableComponent,
    ],
    exports: [TableComponent],
    providers: [{
        provide: TUI_CHECKBOX_OPTIONS,
        useValue: {
            ...TUI_CHECKBOX_DEFAULT_OPTIONS,
            size: 'm'
        }
    }],
})
export class TableModule { }