import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from "src/app/models/user.model";
import { AppServerResponse } from "../http/http.service";

/**
 * Response data trả về khi xác thực
 */
interface AuthResponseData {
    user: {
        email: string,
        userId: string,
        username: string,
        employeeId: string,
        avatar: string
    };
    accessToken: string,
    refreshToken: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //user hiện tại
    user = new BehaviorSubject<User>(null);

    private tokenExperationTimer: any;

    private baseRoute = '/Auth';

    constructor(private http: HttpClient, private router: Router) { }

    /**
     * Đăng nhập
     * @param username 
     * @param password 
     * @returns 
     */
    login(username: string, password: string) {
        return this.http
            .post<AppServerResponse<AuthResponseData>>(
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
                    if (resData.success) {
                        this.handleAuthentication(
                            resData.data.user.email,
                            resData.data.user.userId,
                            resData.data.user.username,
                            resData.data.user.employeeId,
                            resData.data.user.avatar,
                            resData.data.accessToken,
                            resData.data.refreshToken,
                        );
                    }
                }),
                
            )
    }

    /**
     * Tự động đăng nhập lại
     */
    autoLogin() {
        //Lấy userData từ local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        //Cast sang dạng User
        const loadedUser = new User(
            userData['email'],
            userData['userId'],
            userData['username'],
            userData['employeeId'],
            userData['avatar'],
            userData['_accessToken'],
            new Date(userData['_accessTokenExpDate']),
            userData['_refreshToken'],
            new Date(userData['_refreshTokenExpDate'])
        )

        //Nếu token không hợp lệ thì thử refresh lại token
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
                //gán user mới tạo
                this.user.next(loadedUser);

                const expirationDuration = loadedUser.accessTokenExpDate.getTime() - new Date().getTime()

                //set thời gian để tự động refresh lại
                this.autoRefresh(expirationDuration);
            }
        }
    }

    /**
     * Làm mới access token
     */
    refresh() {
        //Lấy userData từ local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        const rToken = userData['_refreshToken'];

        //Gọi api lấy access token mới
        return this.http
            .post<AppServerResponse<AuthResponseData>>(
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
                    if (!resData.success) {
                        this.logout();
                        return;
                    }

                    this.handleAuthentication(
                        userData.email,
                        userData.id,
                        userData.username,
                        userData.employeeId,
                        userData.avatar,
                        resData.data.accessToken,
                        userData._refreshToken,
                    );

                })
            )

    }

    /**
     * Tự động làm mới token
     * @param expirationDuration thời gian tới khi hết hạn
     */
    autoRefresh(expirationDuration: number) {
        console.log("wait: " + expirationDuration);

        //Thời gian gửi yêu cầu trước khi hết hạn
        const fetchAhead = 20000; // 20s

        //Xóa timer cũ
        if (this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
        }

        //Set timer mới 
        this.tokenExperationTimer = setTimeout(() => {
            //refresh lại token
            this.refresh().subscribe(
                resData => {
                    console.log(resData);
                }
            );
        }, expirationDuration - fetchAhead)
    }


    /**
     * Thoát đăng nhập
     */
    logout() {
        //Gửi req lên server
        this.http
            .post<AppServerResponse<AuthResponseData>>(
                this.baseRoute + '/logout',
                {}
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            ).subscribe();

        //Set lại người dùng về null    
        this.user.next(null);

        //Xóa khỏi localStorage
        localStorage.removeItem('userData');

        //Clear timer
        if (this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
        }

        this.tokenExperationTimer = null

        //Quay về trang đăng nhập
        this.router.navigate(['auth']);
    }

    /**
     * Hàm handle xác thực
     * @param email 
     * @param userId 
     * @param username 
     * @param avatar 
     * @param accessToken 
     * @param refreshToken 
     */
    private handleAuthentication(
        email: string,
        userId: string,
        username: string,
        employeeId: string,
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

        //Tạo user mới dựa trên thông tin ở trên
        const user = new User(email, userId, username, employeeId, avatar, accessToken, accessTokenExpDate, refreshToken, refreshTokenExpDate);

        //Set người dùng mới
        this.user.next(user);

        //Lưu vào localStorage
        localStorage.setItem('userData', JSON.stringify(user));

        //Set thời gian tự động refresh token
        this.autoRefresh(accessExpiresTime - new Date().getTime());
    }

    /**
     * Handle lỗi từ response
     * @param errorRes 
     * @returns 
     */
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
    }
}
