import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthDataService } from "../../../../services/auth-data.service";
import { AuthProvider } from "../../../../services/auth-provider";
import { DialogService } from "../../../../services/dialog.service";
import { BaseComponent } from "../../../base/base.component";

@Component({
    selector: 'app-sidebar',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AdminSidebarComponent extends BaseComponent {
    AuthDataService = AuthDataService;
    constructor(
        private router: Router,
        public dialogService: DialogService,
        private authProvider: AuthProvider,
    ) {
        super();
    }

    redirectToProfile() {
        this.router.navigateByUrl('/' + this.RoutesList.AdminUsers + '/' + this.AuthDataService.currentUser.id);
    }

    async logout() {
        const dialogResult = await this.dialogService.showDialog({ header: "Deconnexion", text: "Souhaitez vous vraiment vous déconnecter ?", okLabel: "Confirmer", cancelLabel: "Annuler" });
        if (!dialogResult)
            return;
        this.authProvider.logout();
        this.router.navigateByUrl('/login');
    }
}