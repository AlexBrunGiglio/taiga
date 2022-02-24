import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthDataService } from "../../../services/auth-data.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }
    canActivate(): boolean {
        if (AuthDataService.currentUser)
            return true;
        this.router.navigate(['/login']);
        return false;
    }
}