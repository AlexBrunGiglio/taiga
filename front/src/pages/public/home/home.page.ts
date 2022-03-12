import { Component, ViewEncapsulation } from '@angular/core';
import { UserDto } from '../../../providers/api-client.generated';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomePage {
    columns = ['lastname', 'firstname', 'mail', 'initial', 'lastname', 'lastname'];
    users = [{
        lastname: 'didier',
        firstname: 'philippe'
    },
    {
        lastname: 'didier',
        firstname: 'philippe'
    }] as UserDto[];
}