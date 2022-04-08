import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService, TuiNotificationsService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, LoginViewModel, UserDto } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';
import { accessToken } from '../../../utils/constant';
import { AuthDataService } from '../../../utils/services/auth-data.service';
import { AuthProvider } from '../../../utils/services/auth-provider';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['../auth.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginPage extends BaseComponent implements OnInit {
    user = {} as UserDto;
    activeItemIndex = 0;
    constructor(
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private authService: AuthService,
        private route: Router,
        private authProvider: AuthProvider,
    ) {
        super();
    }

    ngOnInit() {
        if (AuthDataService.currentUser) {
            this.route.navigate(['/']);
            return;
        }
    }

    async login() {
        this.loading = true;

        if (!this.user.mail)
            this.notifications.show('Vous devez renseigner votre email !').subscribe();
        if (!this.user.password)
            this.notifications.show('Vous devez renseigner votre mot de passe !').subscribe();

        await firstValueFrom(this.authService.login({ loginViewModel: { password: this.user.password!, username: this.user.mail! } })).then((res) => {
            this.loading = false;
            this.authProvider.handleLoginResponse(res, false, false);
            this.notifications.show('Connexion réussie !').subscribe();
            this.route.navigateByUrl('/' + this.RoutesList.Home);
        }, (err) => {
            this.loading = false;
            this.dialogService.open(err.error.message!, { label: err.status + ' Une erreur est survenue', size: 's' }).subscribe();
        });
    }
}