import { Component, OnInit } from "@angular/core";
import { NOTI_TYPE } from "src/app/common/consts/notification";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";
import { NotificationService } from "../../components/layouts/notification/notification.service";
import { CalendarService } from "./calendar.service";

@Component({
    selector: "app-calendar-view",
    templateUrl: "./calendar.component.html",
    styleUrls: ["./calendar.component.scss"]
})
export class CalendarViewComponent {
    //Hiện form thêm mới
    isAddFormShow = false;

    //Hiện thông tin chi tiết
    isEventDetailsShow = false;

    selectingEventId: string = "";

    eventCardLoading = false;

    get selectingEvent(): CalendarEvent {
        return this.calendarService.findEventById(this.selectingEventId)
    }

    constructor(private calendarService: CalendarService, private eventService: EventService, private notificationService: NotificationService) { }
    
    /**
     * Handle sự kiện từ router view
     * @param elementRef 
     */
    onActivate(elementRef) {
        elementRef.eventClick?.subscribe(event => {
            this.showEventDetails(event.event._def.publicId)
        });
    }

    /**
     * handle hiển thị add form thay đổi
     * @param value 
     */
    isAddFormShowChange(value) {
        this.isAddFormShow = value;
    }

    /**
     * form thành công
     */
    onAddFromSuccess() {
        this.isAddFormShow = false;
        this.calendarService.reloadEvents();
    }

    /**
     * Handle nút thêm mới
     */
    addEventBtnClick() {
        this.isAddFormShow = true;
    }

    /**
     * Hiển thị thông tin chi tiết sự kiện
     * @param id 
     */
    showEventDetails(id: string) {
        this.selectingEventId = id;
        this.isEventDetailsShow = true;
    }

    /**
     * Xóa sự kiện
     * @param id 
     */
    deleteEvent(id: string) {
        this.eventCardLoading = true;

        //gọi service
        this.eventService.deleteMultiple([id]).subscribe(
            resData => {
                if (resData.success) {
                    //tải lại lịch
                    this.calendarService.reloadEvents();
                    //thông báo thành công
                    this.notificationService.addSuccessNotification("Xóa bản sự kiện thành công");

                    this.isEventDetailsShow = false;
                }
                this.eventCardLoading = false;
            },
            err => {
                console.log(err);
                this.eventCardLoading = false;
            }
        );
    }

    /**
     * Hoàn thành sự kiện
     * @param id 
     */
    completeEvent(id: string) {
        this.eventCardLoading = true;

        //gọi service
        this.eventService.complete(id).subscribe(
            resData => {
                if (resData.success) {
                    //tải lại lịch
                    this.calendarService.reloadEvents();
                    //thông báo thành công
                    this.notificationService.addSuccessNotification("Đã hoàn thành sự kiện");

                    this.isEventDetailsShow = false;
                }
                this.eventCardLoading = false;
            },
            err => {
                console.log(err);
                this.eventCardLoading = false;
            }
        );
    }
}
