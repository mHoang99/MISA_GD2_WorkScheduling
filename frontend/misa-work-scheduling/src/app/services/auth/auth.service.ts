import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from "src/app/models/user.model";

interface AuthResponseData {
    user: {
        email: string,
        userId: string,
        username: string
        avatar: string
    };
    accessToken: string,
    refreshToken: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExperationTimer: any;

    private baseRoute = '/Auth';

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                this.baseRoute + '/login',
                {
                    username: username,
                    password: password,
                }
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                }),
                tap(resData => {
                    if (resData.user) {
                        this.handleAuthentication(
                            resData.user.email,
                            resData.user.userId,
                            resData.user.username,
                            resData.user.avatar,
                            resData.accessToken,
                            resData.refreshToken,
                        );
                    }
                })
            )
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData['email'],
            userData['userId'],
            userData['username'],
            userData['avatar'],
            userData['_accessToken'],
            new Date(userData['_accessTokenExpDate']),
            userData['_refreshToken'],
            new Date(userData['_refreshTokenExpDate'])
        )

        if (new Date().getTime() > loadedUser.accessTokenExpDate.getTime()
            || !loadedUser.accessTokenExpDate
            || !loadedUser.accessToken
        ) {
            this.refresh().subscribe(
                resData => {
                    console.log(resData);
                }
            );
        } else {
            if (loadedUser.accessToken) {
                this.user.next(loadedUser);
                const expirationDuration = loadedUser.accessTokenExpDate.getTime() - new Date().getTime()
                this.autoRefresh(expirationDuration);
            }
        }
    }

    refresh() {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const rToken = userData['_refreshToken'];

        return this.http
            .post<AuthResponseData>(
                this.baseRoute + '/refresh',
                {
                    refreshToken: rToken,
                }
            )
            .pipe(
                catchError(errorRes => {
                    this.logout();
                    return this.handleError(errorRes);
                }),
                tap(resData => {
                    if (!resData) {
                        this.logout();
                        return;
                    }

                    const userData = JSON.parse(localStorage.getItem('userData'));
                    if (!userData) {
                        return null;
                    }

                    this.handleAuthentication(
                        userData.email,
                        userData.userId,
                        userData.username,
                        userData.avatar ?? "",
                        resData.accessToken,
                        userData._refreshToken,
                    );

                })
            )

    }

    autoRefresh(expirationDuration: number) {
        console.log("wait: " + expirationDuration)

        if (this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
        }

        this.tokenExperationTimer = setTimeout(() => {
            this.refresh().subscribe(
                resData => {
                    console.log(resData);
                }
            );
        }, expirationDuration - 10000)
    }


    logout() {
        this.http
            .post<AuthResponseData>(
                this.baseRoute + '/logout',
                {}
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            ).subscribe();

        this.user.next(null);

        localStorage.removeItem('userData');

        if (this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
        }
        this.tokenExperationTimer = null

        this.router.navigate(['auth']);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        username: string,
        avatar: string,
        accessToken: string,
        refreshToken: string
    ) {
        let decodedToken = jwtDecode(accessToken);

        let accessExpiresTime = +decodedToken['exp'] * 1000;

        let decodedRefreshToken = jwtDecode(refreshToken);

        let refreshExpiresTime = +decodedRefreshToken['exp'] * 1000;

        console.log(decodedToken);
        console.log(decodedRefreshToken);

        const accessTokenExpDate = new Date(accessExpiresTime)

        const refreshTokenExpDate = new Date(refreshExpiresTime)

        const user = new User(email, userId, username, avatar, accessToken, accessTokenExpDate, refreshToken, refreshTokenExpDate);

        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoRefresh(accessExpiresTime - new Date().getTime());
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
    }
}
