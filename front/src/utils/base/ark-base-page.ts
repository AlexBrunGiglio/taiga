import { Directive } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AuthDataService } from '../services/auth-data.service';
import { BaseComponent } from './base.component';

export interface SeoData {
    title: string;
    meta?: { key: string; value: string; }[];
    addSuffixToTitle?: boolean;
}

@Directive({})
export abstract class BasePageComponent extends BaseComponent {
    public static meta: Meta;
    public static title: Title;
    public isAdmin: boolean;
    constructor(public seoData?: SeoData, public unloadMessage?: string) {
        super();
        this.isAdmin = this.GlobalAppService.userHasRole(AuthDataService.currentUser, this.RolesList.Admin);
        this.setSeoData();
    }
    setSeoData(seoData?: SeoData) {
        if (!seoData)
            seoData = this.seoData;
        if (!seoData)
            return;
        if (typeof seoData.addSuffixToTitle === 'undefined')
            seoData.addSuffixToTitle = true;

        if (seoData.title && BasePageComponent.title)
            BasePageComponent.title.setTitle(seoData.title);
        if (seoData.meta && BasePageComponent.meta)
            seoData.meta.forEach((x) => {
                BasePageComponent.meta.addTag({ name: x.key, content: x.value });
            });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}