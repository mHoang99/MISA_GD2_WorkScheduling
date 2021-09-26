import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";
import { CalendarService } from "./calendar.service";

@Component({
    selector: "app-calendar-view",
    templateUrl: "./calendar.component.html",
    styleUrls: ["./calendar.component.scss"]
})
export class CalendarViewComponent {
    isAddFormShow = false;
    isEventDetailsShow = false;
    selectingEventId: string = "";

    eventCardLoading = false;

    get selectingEvent(): CalendarEvent {
        return this.calendarService.findEventById(this.selectingEventId)
    }

    constructor(private calendarService: CalendarService, private eventService: EventService) { }
    
    onActivate(elementRef) {
        elementRef.eventClick?.subscribe(event => {
            this.showEventDetails(event.event._def.publicId)
        });
    }

    isAddFormShowChange(value) {
        this.isAddFormShow = value;
    }

    addEventBtnClick() {
        this.isAddFormShow = true;
    }

    showEventDetails(id: string) {
        this.selectingEventId = id;
        this.isEventDetailsShow = true;
    }

    deleteEvent(id: string) {
        this.eventCardLoading = true;
        this.eventService.deleteMultiple([id]).subscribe(
            rowCount => {
                console.log(rowCount);
                if (rowCount > 0) {
                    this.calendarService.loadEvents();
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

    completeEvent(id: string) {
        this.eventCardLoading = true;
        this.eventService.complete(id).subscribe(
            rowCount => {
                console.log(rowCount);
                if (rowCount > 0) {
                    this.calendarService.loadEvents();
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
