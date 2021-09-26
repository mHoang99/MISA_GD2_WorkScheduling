import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class GroupService extends HttpService {

    protected defaultPath = "/Groups";

    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

    public getManagedByUser() {
        return this.http.get<[object]>(
            this.defaultPath + "/Manager"
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

}