import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { BaseComponent } from '../../utils/base/base.component';

export interface ArkBaseListItem {
    icon?: string,
    label: string,
    tooltip?: string,
}

export interface ArkBaseListWrapper {
    id?: number,
    items: ArkBaseListItem[],
    entityId: string,
    selected?: boolean,
    disabled?: boolean,
}

enum EntityNameLabel {
    user = "Utilisateur",
    moovie = "Film",
    series = "Série",
}

@Component({
    selector: 'ark-list',
    templateUrl: './ark-list.component.html',
    styleUrls: ['./ark-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ArkListComponent extends BaseComponent {
    @Output() archiveBtnClicked = new EventEmitter<any[]>();
    @Output() includeArchivedChange = new EventEmitter();

    @Input() items!: ArkBaseListWrapper[];
    @Input() baseEntityUrl!: string;
    @Input() entityName!: keyof typeof EntityNameLabel;
    @Input() isLoading = false;
    @Input() override request!: {};


    selectedAppItems: ArkBaseListWrapper[] = [];
    selectionMode = false;

    constructor(
        private dialogService: TuiDialogService,
    ) {
        super();
    }

    changeListMode() {
        this.selectionMode = !!!this.selectionMode;
    }

    async archiveSelectedItems() {
        this.archiveBtnClicked.emit(this.items.filter(x => x.selected));
        this.selectionMode = false;
        this.items.forEach(x => x.selected = false);
    }

    isItemAnySelected() {
        return this.items.filter(x => x.selected)?.length;
    }

    onIncludeArchivedChange() {
        this.includeArchivedChange.emit();
    }

    isAnyItemNotArchived() {
        return this.items.some(x => !x.disabled);
    }
}