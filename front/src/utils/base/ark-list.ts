import { Directive } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ArkBaseList } from './ark-base-list';
import { BaseRequest } from './base.component';

@Directive({})
export abstract class BaseSimpleList<ItemType extends { id?: string | number; }, RequestType extends BaseRequest> extends ArkBaseList<ItemType, RequestType> {
    constructor(
        protected override responseDataFieldName: string,
        protected override dialogService: TuiDialogService,
        loadOnInit: boolean = true,
    ) {
        super(responseDataFieldName, dialogService, loadOnInit);
    }
}