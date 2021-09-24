import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class EventService extends HttpService {

    protected defaultPath = "/Events";

    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

    public getAllEvents() {
        return this.http.get<[object]>(
            this.defaultPath + "/All"
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

}
