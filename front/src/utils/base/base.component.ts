import { Directive, OnDestroy } from "@angular/core";
import { RolesList } from "../../../../shared/shared-constant"
import { gobalNightMode } from '../../app/app.component';
import { environment } from "../../environments/environment";
import { RoutesList } from '../../routes/routes';
import { GlobalAppService } from '../services/global.service';

export interface BaseRequest {
    start?: number;
    length?: number;
    orderby?: string;
    order?: string;
    search?: string;
}
@Directive({})
export abstract class BaseComponent implements OnDestroy {
    public RoutesList = RoutesList;
    public RolesList = RolesList;
    public hasPendingModifications = false;
    public environment = environment;
    public loading = false;
    request: BaseRequest = {};
    GlobalAppService = GlobalAppService;
    constructor() {
        this.initComponent();
    }

    initComponent() {
        if (gobalNightMode) {
            document.body.classList.toggle('dark-theme');
        }
    }

    ngOnDestroy() { }
}