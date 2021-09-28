import { Component, OnInit } from "@angular/core";
import { NotificationService, Notification } from "./notification.service";

@Component({
    selector: "app-notification-center",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notificaiton.component.scss"]
})
export class NotificationCenterComponent implements OnInit {

    //danh sách thông báo
    notiList: Notification[];

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        //Lấy danh sách thông báo
        this.notificationService.notiSources.subscribe(
            notiList=> {
                this.notiList = notiList
            }
        )
    }
}
