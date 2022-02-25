import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiNotificationsService } from '@taiga-ui/core';
import { AuthService, UserDto, UsersService } from '../../../providers/api-client.generated';
import { BaseComponent } from '../../../utils/base/base.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterPage extends BaseComponent {
    activeItemIndex = 0;
    user = {} as UserDto;
    passwordConfirm = '';
    constructor(
        @Inject(TuiNotificationsService)
        private readonly notifications: TuiNotificationsService,
        private authService: AuthService,
    ) {
        super();
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


        this.loading = false;
    }
}