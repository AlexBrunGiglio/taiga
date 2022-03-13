import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface DataListWrapper {
    selected: boolean;
    data: any;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
    @Input() columns: string[] = [];
    @Input() data: any;
    @Input() showActionCol = false;
    @Input() editRoute = '';
    dataListWrapper = [] as DataListWrapper[];
    loading = false;
    selectAll = false;
    constructor() {
    }

    ngOnInit(): void {
        this.loading = true;
        for (const dataItem of this.data) {
            this.dataListWrapper.push({ selected: false, data: dataItem });
        }
        this.loading = false;
    }

    onSelectAllItem() {
        if (this.selectAll)
            this.dataListWrapper.forEach((item) => {
                item.selected = true;
            });
        else
            this.dataListWrapper.forEach((item) => {
                item.selected = false;
            });
    }
}