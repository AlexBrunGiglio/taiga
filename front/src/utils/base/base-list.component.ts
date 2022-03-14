import { Directive } from '@angular/core';
import { BaseComponent, BaseRequest } from './base.component';

@Directive({})
export abstract class BaseListComponent extends BaseComponent {
    public loadDataTimeoutId: any;
    constructor() {
        super();
    }

    public loadDataDelayed() {
        if (this.loadDataTimeoutId) {
            clearTimeout(this.loadDataTimeoutId);
        }
        this.loadDataTimeoutId = setTimeout(() => {
            this.loadData();
        }, 500);
    }

    public async loadData() {
        if (!this.request)
            this.request = {} as BaseRequest;
    }
}