import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';



export class HttpService {
    constructor(private http: HttpClient, private router: Router) { }

    protected defaultPath = "";

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

    post(body: {}) {
        return this.http
            .post(
                this.defaultPath + '/post',
                body
            )
            .pipe(
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
    }

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

    protected handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        errorMessage = errorRes.error.message;
        return throwError(errorMessage);
    }
}
