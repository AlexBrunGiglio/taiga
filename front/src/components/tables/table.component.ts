import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
    @Input() columns: string[] = [];
    @Input() data: any;

    constructor() {
    }

    ngOnInit(): void {

    }
}