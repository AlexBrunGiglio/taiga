import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService, TuiNotificationsService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, LoginViewModel, UserDto } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';
import { accessToken } from '../../../utils/constant';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['../auth.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginPage extends BaseComponent {
    user = {} as UserDto;
    activeItemIndex = 0;
    constructor(
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private authService: AuthService,
        private route: Router,
    ) {
        super();
    }


    async login() {
        this.loading = true;

        if (!this.user.mail)
            this.notifications.show('Vous devez renseigner votre email !').subscribe();
        if (!this.user.password)
            this.notifications.show('Vous devez renseigner votre mot de passe !').subscribe();

        const loginResponse = await firstValueFrom(this.authService.login({
            username: this.user.mail,
            password: this.user.password,
        } as LoginViewModel
        ));

        this.loading = false;
        console.log("🚀 ~ RegisterPage ~ registerUser ~ loginResponse", loginResponse);

        if (!loginResponse.success) {
            this.dialogService.open(loginResponse.message!, { label: 'Une erreur est survenue', size: 's' }).subscribe();
            return;
        }
        localStorage.setItem(accessToken, loginResponse.token!);
        this.notifications.show('Connexion réussie !').subscribe();
        this.route.navigateByUrl('/' + this.RoutesList.Home);
    }
}