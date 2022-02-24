import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthDataService } from "../../../services/auth-data.service";
import { GlobalAppService } from "../../../services/global.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!route.data || !route.data.roles) {
            this.router.navigate(['/login']);
            return false;
        }
        const roles = route.data.roles as string[];
        if (AuthDataService.currentUser && GlobalAppService.userHasOneOfRoles(AuthDataService.currentUser, roles))
            return true;
        this.router.navigate(['/login']);
        return false;
    }
}