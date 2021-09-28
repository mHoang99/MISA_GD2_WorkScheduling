import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import jwtDecode from "jwt-decode";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";

/**
 * Guard cho các route yêu cầu authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;

                if (isAuth) {
                    console.log(user.role)

                    //Kiểm tra role có nằm trong danh sách cho phép truy cập không
                    if (!(route.data.role && route.data.role.indexOf(user.role) === -1)) {
                        return true;
                    } else {
                        this.authService.logout();
                    }

                    return true;
                }

                return this.router.createUrlTree(['/auth'])
            }));
    }

}