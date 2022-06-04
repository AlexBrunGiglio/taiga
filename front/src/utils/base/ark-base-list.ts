import { Directive } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { GenericResponse } from '../../providers/api-client.generated';
import { BasePageComponent } from './ark-base-page';
import { BaseRequest } from './base.component';

export interface BaseWrapper<T> {
    item: T;
    expanded: boolean;
}

@Directive({})
export abstract class ArkBaseList<ItemType extends { id?: string | number; }, RequestType extends BaseRequest> extends BasePageComponent {
    cellTextMaxLength = 40;
    removeDialogText = 'Êtes-vous sûr de vouloir supprimer les éléments sélectionnés ?';
    archiveDialogText = 'Êtes-vous sûr de vouloir archiver les éléments sélectionnés ?';
    public override request: RequestType = {} as RequestType;
    datasource: BaseWrapper<ItemType>[] = [];
    items: ItemType[] = [];

    public errorMessage: string = '';
    public loadDataTimeoutId: any;
    public override loading: boolean = true;
    public itemsChecked: ItemType[] = [];
    public filteredItemsCount: number = 0;
    public itemCheckedChangeEmitter = new Subject<ItemType>();
    public datasourceLoaded = new Subject<void>();
    public onItemRemoved = new Subject<ItemType>();

    constructor(
        protected responseDataFieldName: string,
        protected dialogService: TuiDialogService,
        protected loadOnInit: boolean = true,
    ) {
        super(undefined);
    }
    ngAfterViewInit(): void {
        this.init();
    }
    public isExpandedAfterLoadingData(): boolean {
        return false;
    }
    public loadDataDelayed() {
        if (this.loadDataTimeoutId) {
            clearTimeout(this.loadDataTimeoutId);
        }
        this.loadDataTimeoutId = setTimeout(() => {
            this.loadData();
        }, 500);
    }

    public async loadData(resetPage: boolean = true) {
        this.itemsChecked = [];
        if (!this.request)
            this.request = {} as RequestType;
        //defaults
        this.request.length = 20;
        this.request.start = 0 * 20;
        this.loading = true;
        const response = await this.loadCustomData();
        this.loading = false;
        if (response.success) {
            const items = (response as any)[this.responseDataFieldName] as any[];
            this.datasource = items.map<BaseWrapper<ItemType>>((x: ItemType) => ({ item: x, expanded: this.isExpandedAfterLoadingData() }));
            this.items = items;
            this.filteredItemsCount = (response as any).filteredResults;
            this.datasourceLoaded.next();
            this.createArkListWrapper();
        }
        else
            this.dialogService.open(response.message!).subscribe();

    }
    public abstract loadCustomData(): Promise<GenericResponse>;
    public removeCustomData(ids: (string | number)[]): Promise<GenericResponse> {
        return Promise.resolve({ success: true } as GenericResponse);
    }
    public archiveCustomData(ids: (string | number)[]): Promise<GenericResponse> {
        return Promise.resolve({ success: true } as GenericResponse);
    }

    public isItemChecked(wrapper: BaseWrapper<ItemType>): boolean {
        return this.itemsChecked.some(x => x === wrapper.item);
    }
    public itemCheckedChange(wrapper: BaseWrapper<ItemType>, checked: boolean, unselectOthers?: boolean, evt?: MouseEvent) {
        if (evt && ((evt.target as HTMLElement).tagName.toLowerCase() === 'button' || (evt.target as HTMLElement).tagName.toLowerCase() === 'mat-icon')) {
            evt.preventDefault();
            return;
        }
        if (unselectOthers)
            this.itemsChecked = [];
        if (this.itemsChecked.indexOf(wrapper.item) !== -1 && !checked)
            this.itemsChecked.splice(this.itemsChecked.indexOf(wrapper.item), 1);
        else if (this.itemsChecked.indexOf(wrapper.item) === -1 && checked)
            this.itemsChecked.push(wrapper.item);
        this.itemCheckedChangeEmitter.next(wrapper.item);
    }
    public async removeSelectedItems(archive?: boolean, ignoreConfirm?: boolean) {
        if (this.itemsChecked.length === 0)
            return;
        // if (!ignoreConfirm) {
        //     const dialogResult = await this.dialogService.showConfirmDialog(archive ? this.archiveDialogText : this.removeDialogText);
        //     if (!dialogResult.okClicked)
        //         return;
        // }
        let response: GenericResponse;
        if (archive)
            response = await this.archiveCustomData(this.itemsChecked.map(x => x.id!));
        else
            response = await this.removeCustomData(this.itemsChecked.map(x => x.id!));
        if (!response.success) {
            this.loading = true;
            this.dialogService.open(response.message!).subscribe();
        }
        else {
            await this.loadData(true);
            for (const item of this.itemsChecked) {
                this.onItemRemoved.next(item);
            }
            this.itemsChecked = [];
        }
        this.loading = false;
    }

    public init() {
        if (this.loadOnInit)
            this.loadData(false);
    }

    resetDatasource() {
        this.items = [];
        this.datasource = [];
    }

    public createArkListWrapper() { }
}