import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface DataListWrapper {
    selected: boolean;
    data: any;
}

@Component({
    selector: 'app-simple-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SimpleTableComponent implements OnInit {
    @Input() columns: string[] = [];
    @Input() data: any | any[];
    @Input() showActionCol = false;
    @Input() editRoute = '';
    dataListWrapper = [] as DataListWrapper[];
    loading = false;
    selectAll = false;
    page = 3;
    size = 10;
    constructor() {
    }

    ngOnInit(): void {
        console.log("🚀 ~ TableComponent ~ ngOnInit ~ this.data", this.data);
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