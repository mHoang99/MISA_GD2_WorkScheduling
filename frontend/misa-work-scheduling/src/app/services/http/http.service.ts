import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { MESSAGE } from "src/app/common/consts/text";
import { NotificationService } from "src/app/components/layouts/notification/notification.service";


export interface AppServerResponse<T> {
    success: boolean,
    data: T,
    userMsg: string,
    devMsg: string
    errorCode: string
}

/**
 * Base class cho việc gọi api
 */
export class HttpService {
    constructor(protected http: HttpClient, protected router: Router, protected notificationService: NotificationService) { }

    protected defaultPath = "";

    /**
     * Lấy tất cả
     * @returns Observable response
     */
    getAll() {
        return this.http
            .get<AppServerResponse<any>>(
                this.defaultPath
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

    /**
     * Lấy theo id
     * @param id 
     * @returns Observable response
     */
    getById(id: string) {
        return this.http
            .get<AppServerResponse<any>>(
                this.defaultPath + `/${id}`
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

    /**
     * Thêm mới
     * @param body Request body
     * @returns Observable response
     */
    post(body: {}) {
        return this.http
            .post<AppServerResponse<any>>(
                this.defaultPath,
                body
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

    /**
     * Thay đổi
     * @param id 
     * @param body Request body
     * @returns Observable response
     */
    put(id: string, body: {}) {
        return this.http
            .put<AppServerResponse<any>>(
                this.defaultPath + `/${id}`,
                body
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

    /**
     * Xóa
     * @param id 
     * @param body Request body
     * @returns Observable response
     */
    delete(id: string) {
        return this.http
            .delete<AppServerResponse<any>>(
                this.defaultPath + `/${id}`
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

    /**
     * Handle lỗi trả về từ api
     * @param errorRes Lỗi
     * @returns 
     */
    protected handleError(errorRes: HttpErrorResponse) {
        let errorMessage = MESSAGE.EXCEPTION;
        console.log(errorRes.error)

        this.notificationService.addWarningNotification(errorMessage);
        
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
    }
}
