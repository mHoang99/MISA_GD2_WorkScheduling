import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";

@Component({
    selector: "app-calendar-add-form",
    templateUrl: "./add-form.component.html",
    styleUrls: ["./add-form.component.scss"]
})
export class CalendarAddFormComponent {
    @Input() isShow = false;
    @Output() isShowChange = new EventEmitter();

    isLoading = false;
    error: string = "";

    constructor(private eventService: EventService) {}

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

        const title = form.value.title;
        const content = form.value.content;
        const startDate = form.value.startDate;
        const startTime = form.value.startTime;
        const endDate = form.value.endDate;
        const endTime = form.value.endTime;

        let startDateTime = new Date(startDate);
        startDateTime.setUTCHours(startTime.split(':')[0]);
        startDateTime.setUTCMinutes(startTime.split(':')[1]);

        let endDateTime = new Date(endDate);
        endDateTime.setUTCHours(endTime.split(':')[0]);
        endDateTime.setUTCMinutes(startTime.split(':')[1]);

        console.log(startTime, endTime)
        console.log(startDate, endDate)
        console.log(startDateTime, endDateTime)

        this.isLoading = true;

        this.eventService.post({
            title: title,
            content: content,
            employeeId: JSON.parse(localStorage.getItem('userData')).employeeId,
            startTime: startDateTime,
            endTime: endDateTime
        }).subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                console.log(resData)
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

