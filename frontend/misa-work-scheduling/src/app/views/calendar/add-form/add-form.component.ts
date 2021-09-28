import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EventService } from "src/app/services/http/event.service";
import { NotificationService } from "../../../components/layouts/notification/notification.service";

@Component({
    selector: "app-calendar-add-form",
    templateUrl: "./add-form.component.html",
    styleUrls: ["./add-form.component.scss"]
})
export class CalendarAddFormComponent {
    //Hiện form
    @Input() isShow = false;
    //Hiển thị form thay đổi
    @Output() isShowChange = new EventEmitter();

    @Output() onSuccess = new EventEmitter();

    //Đang loading
    isLoading = false;

    error: string = "";

    constructor(private eventService: EventService, private notificationService: NotificationService) {}

    /**
     * Handle sự kiện form submit
     * @param form 
     * @returns 
     */
    onSubmit(form: NgForm) {
        //Kiểm tra form valid
        if (!form.valid) {
            return;
        }

        //Lấy giá trị từ form
        const title = form.value.title;
        const content = form.value.content;
        const startDate = form.value.startDate;
        const startTime = form.value.startTime;
        const endDate = form.value.endDate;
        const endTime = form.value.endTime;

        //gộp ngày và giờ
        let startDateTime = new Date(startDate);
        startDateTime.setUTCHours(startTime.split(':')[0]);
        startDateTime.setUTCMinutes(startTime.split(':')[1]);

        let endDateTime = new Date(endDate);
        endDateTime.setUTCHours(endTime.split(':')[0]);
        endDateTime.setUTCMinutes(startTime.split(':')[1]);

        this.isLoading = true;

        //Gọi service 
        this.eventService.post({
            title: title,
            content: content,
            employeeId: JSON.parse(localStorage.getItem('userData')).employeeId,
            startTime: startDateTime,
            endTime: endDateTime
        }).subscribe(
            resData => {
                if(!resData.success) {
                    this.error = resData['userMsg']
                } else {
                    this.notificationService.addSuccessNotification("Đã thêm sự kiện vào kế hoạch");

                }
                this.onSuccess.emit();
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                console.log(error);
                this.error = error
            },
        );

        //reset lại form
        form.reset();
    }
}

