import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


/**
 * Base class cho việc gọi api
 */
export class HttpService {
    constructor(protected http: HttpClient, protected router: Router) { }

    protected defaultPath = "";

    /**
     * Lấy tất cả
     * @returns Observable response
     */
    getAll() {
        return this.http
            .get(
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
            .get(
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
            .post(
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
            .put(
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
            .delete(
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
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
    }
}
