import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { NotificationService } from "src/app/components/layouts/notification/notification.service";
import { CalendarEvent } from "src/app/models/event.model";
import { AppServerResponse, HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class EventService extends HttpService {

    protected defaultPath = "/Events";

    constructor(http: HttpClient, router: Router, notificationService: NotificationService) {
        super(http, router, notificationService);
    }

    /**
     * Lấy sự kiện theo khoảng thời gian
     * @param start bắt đầu
     * @param end kết thúc
     * @returns 
     */
    public getEventsByRange(start: Date, end: Date) {
        return this.http.post<AppServerResponse<CalendarEvent[]>>(
            this.defaultPath + "/Range",
            {
                start: start,
                end: end
            }
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    /**
     * Xóa nhiều
     * @param ids 
     * @returns 
     */
    public deleteMultiple(ids: string[]) {
        return this.http.delete<AppServerResponse<number>>(
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

    /**
     * duyệt nhiều
     * @param ids 
     * @returns 
     */
    public approveMultiple(ids: string[]) {
        return this.http.put<AppServerResponse<number>>(
            this.defaultPath + `/MultipleApproval`,
            { ids: ids }
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    /**
     * hoàn thành 1
     * @param id 
     * @returns 
     */
    public complete(id: string) {
        return this.http.put<AppServerResponse<number>>(
            this.defaultPath + `/Completion/${id}`,
            {}
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

    /**
     * Lấy sự kiện theo group
     * @param id 
     * @returns 
     */
    public getByGroup(id: string) {
        return this.http.get<AppServerResponse<CalendarEvent[]>>(
            this.defaultPath + `/Group/${id}`
        ).pipe(
            catchError(errorRes => {
                return this.handleError(errorRes);
            })
        )
    }

}
