import { NgModule } from '@angular/core';
import { TuiFilesModule, TuiInputFilesModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../app/app.module';
import { InputFileCustom } from './file-upload.component';

@NgModule({
    declarations: [
        InputFileCustom,
    ],
    imports: [
        ...BasePageModulesList,
        TuiInputFilesModule,
        TuiFilesModule,
    ],
    exports: [InputFileCustom],
})
export class InputFileCustomModule { }