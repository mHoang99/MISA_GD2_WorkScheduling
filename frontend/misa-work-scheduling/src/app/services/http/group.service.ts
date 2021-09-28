import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { NotificationService } from "src/app/components/layouts/notification/notification.service";
import { AppServerResponse, HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class GroupService extends HttpService {

    protected defaultPath = "/Groups";

    constructor(http: HttpClient, router: Router, notificationService: NotificationService) {
        super(http, router, notificationService);
    }

    /**
     * Lấy những group được quản lý bở user
     * @returns 
     */
    public getManagedByUser() {
        return this.http.get<AppServerResponse<[any]>>(
            this.defaultPath + "/Manager"
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

}