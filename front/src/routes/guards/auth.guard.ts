import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { accessToken } from '../../utils/constant';
import { AuthProvider } from '../../utils/services/auth-provider';
import { LocalStorageService } from '../../utils/services/local-storage.service';
import { RoutesList } from '../routes';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authProvider: AuthProvider,
    ) { }
    canActivate(): boolean {
        const accessTokenFromBrowser = LocalStorageService.getFromLocalStorage(accessToken);
        const userToken = this.authProvider.getUserFromAccessToken(accessTokenFromBrowser as string, true);

        if (userToken)
            return true;
        this.router.navigate([RoutesList.Login]);
        return false;
    }
}