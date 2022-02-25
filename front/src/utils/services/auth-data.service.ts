import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { UserDto } from '../../providers/api-client.generated';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
    private static pCurrentUser: UserDto;
    public static set currentUser(user: UserDto) {
        this.pCurrentUser = user;
        this.currentUserChanged.next();
    }

    public static get currentUser(): UserDto {
        return this.pCurrentUser;
    }

    public static currentAuthToken: string | undefined;
    public static currentUserChanged = new Subject<void>();
    public static currentRequester: UserDto;
}