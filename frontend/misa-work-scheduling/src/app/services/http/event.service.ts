import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { CalendarEvent } from "src/app/models/event.model";
import { HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class EventService extends HttpService {

    protected defaultPath = "/Events";

    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

    public getAllEvents() {
        return this.http.get<[CalendarEvent]>(
            this.defaultPath + "/All"
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    public deleteMultiple(ids: string[]) {
        return this.http.delete(
            this.defaultPath + `/MultipleRemoval`,
            {
                body: { ids: ids },
            }
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    public approveMultiple(ids: string[]) {
        return this.http.put(
            this.defaultPath + `/MultipleApproval`,
            { ids: ids }
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    public complete(id: string) {
        return this.http.put(
            this.defaultPath + `/Completion/${id}`,
            {}
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    public getByGroup(id: string) {
        return this.http.get<[CalendarEvent]>(
            this.defaultPath + `/Group/${id}`
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

}
