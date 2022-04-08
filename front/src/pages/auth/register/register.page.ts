import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDialogService, TuiNotificationsService } from '@taiga-ui/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';
import { accessToken } from '../../../utils/constant';
import { AuthDataService } from '../../../utils/services/auth-data.service';
import { AuthProvider } from '../../../utils/services/auth-provider';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['../auth.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterPage extends BaseComponent implements OnInit {
    activeItemIndex = 0;
    user = {} as UserDto;
    passwordConfirm = '';
    constructor(
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private authService: AuthService,
        private authProvider: AuthProvider,
        private route: Router,
    ) {
        super();
    }

    ngOnInit() {
        if (AuthDataService.currentUser) {
            this.route.navigate(['/']);
            return;
        }
    }

    onClick(item: string) {
        this.notifications.show(item).subscribe();
    }

    async onNextStep(item: any) {
        if (this.activeItemIndex === 0) {
            this.activeItemIndex = 1;
        }
        else {
            await this.registerUser();
        }
    }

    async registerUser() {
        this.loading = true;
        if (this.passwordConfirm !== this.user.password)
            this.notifications.show('Vos mots de passes ne correspondent pas !').subscribe();

        if (!this.user.mail)
            this.notifications.show('Vous devez renseigner votre email !').subscribe();

        if (!this.user.firstname || !this.user.lastname)
            this.notifications.show('Vous devez renseigner votre nom et prénom !').subscribe();

        await firstValueFrom(this.authService.register({
            registerRequest: {
                mail: this.user.mail!,
                password: this.user.password!,
                username: this.user.firstname + '-' + this.user.lastname,
                firstName: this.user.firstname,
                lastName: this.user.lastname,
            }
        })).then((res) => {
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