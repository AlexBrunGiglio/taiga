import { Injectable } from "@angular/core";
import { AuthDataService } from "./auth-data.service";
import jwtDecode from "jwt-decode";
import { LocalStorageService } from "./local-storage.service";
import { EventsHandler, HandleLoginResponseData } from "./events.handler";
import { AppCookieService } from "./app-cookie.service";
import { LoginResponse, ReferentialService, UserDto, UsersService } from '../../providers/api-client.generated';
import { JwtPayload } from '../../../../shared/jwt-payload';
import { accessToken } from '../constant';
@Injectable()
export class AuthProvider {
    private refreshTokenIntervalId: any;
    constructor(
        private appCookieService: AppCookieService,
        private authService: AuthDataService,
        private userService: UsersService,
        private referentialService: ReferentialService,
    ) {
        const sub = EventsHandler.HandleLoginResponseEvent.subscribe((data: HandleLoginResponseData) => {
            this.handleRefreshTokenFromResponse(data);
        });
    }

    getDecodedAccessToken(token: string): JwtPayload {
        try {
            return jwtDecode(token);
        }
        catch (err) {
            return {} as JwtPayload;
        }
    }

    public getUserFromAccessToken(accessToken: string | undefined, setCurrentUser: boolean) {
        let user: UserDto | null;

        if (!accessToken)
            return null;
        try {
            const decoded: JwtPayload = this.getDecodedAccessToken(accessToken);
            if (!decoded)
                return null;
            user = {
                disabled: false,
                mail: decoded.mail,
                username: decoded.username,
                id: decoded.id,
                rolesString: decoded.roles,
                firstname: decoded.firstname,
                lastname: decoded.lastname,
                imgUrl: decoded.imgUrl,
            };
            if (setCurrentUser) {
                AuthDataService.currentUser = user;
            }
        }
        catch (err) {
            user = null;
        }
        return user;
    }

    public handleLoginResponse(response: LoginResponse, fromRefreshToken: boolean, forceLogout: boolean) {
        if (response.success) {
            AuthDataService.currentAuthToken = response.token;
            LocalStorageService.saveInLocalStorage(accessToken, AuthDataService.currentAuthToken);
            this.appCookieService.set(accessToken, AuthDataService.currentAuthToken);
            if (response.refreshToken) {
                this.appCookieService.set(accessToken, response.refreshToken);
            }
            this.getUserFromAccessToken(AuthDataService.currentAuthToken, true);
        }
        else {
            if (forceLogout || (fromRefreshToken && response.statusCode && response.statusCode === 403)) {
                this.logout();
            }
        }
    }

    public async logout() {
        const userId = AuthDataService.currentUser?.id;
        AuthDataService.currentUser = null!;
        AuthDataService.currentAuthToken = null!;
        AuthDataService.currentRequester = null!;
        LocalStorageService.removeFromLocalStorage(accessToken);
    }

    private handleRefreshTokenFromResponse(data: HandleLoginResponseData) {
        if (!data || !data.response || !data.response.success || !data.response.token)
            return;
        const decoded: JwtPayload = this.getDecodedAccessToken(data.response.token);
        if (!decoded)
            return;
        this.handleLoginResponse(data.response, data.fromRefreshToken, data.forceLogout);
    }
}