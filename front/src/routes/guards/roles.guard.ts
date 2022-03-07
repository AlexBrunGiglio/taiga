import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthDataService } from '../../utils/services/auth-data.service';
import { GlobalAppService } from '../../utils/services/global.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        console.log("🚀 ~ RoleGuard ~ canActivate ~ route", route.data?.[0].roles);
        if (!route.data || !route.data?.[0].roles) {
            this.router.navigate(['/login']);
            return false;
        }
        const roles = route.data?.[0].roles as string[];
        if (AuthDataService.currentUser && GlobalAppService.userHasOneOfRoles(AuthDataService.currentUser, roles))
            return true;
        this.router.navigate(['/login']);
        return false;
    }
}