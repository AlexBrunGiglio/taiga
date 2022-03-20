import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../providers/api-client.generated';
import { RoutesList } from '../../../routes/routes';

@Component({
    selector: 'app-activate-account',
    templateUrl: './activate-account.page.html',
})
export class ActivateAccountPage {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialogService: TuiDialogService,
        private authService: AuthService,
    ) {
        this.init();
    }

    async init() {
        const activeUser = await firstValueFrom(this.authService.activateAccount());
        if (!activeUser.success) {
            this.dialogService.open(activeUser.message!).subscribe();
            return;
        }
        this.router.navigate([RoutesList.Home]);
    }
}