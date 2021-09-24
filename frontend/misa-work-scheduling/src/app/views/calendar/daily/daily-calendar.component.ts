import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar, CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Subscription } from "rxjs";
import { BaseCalendarView, DEFAULT_CALENDAR_OPTIONS } from "../base-calendar-view";
import { CalendarService, EventSource } from "../calendar.service";

@Component({
    selector: "app-daily-calendar-view",
    templateUrl: "./daily-calendar.component.html",
    styleUrls: ["./daily-calendar.component.scss"]
})
export class DailyCalendarViewComponent extends BaseCalendarView implements  OnInit, AfterViewInit, OnDestroy {
    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    calendarOptions: CalendarOptions = {
        ...DEFAULT_CALENDAR_OPTIONS,
        initialView: 'timeGridDay',
        locale: "vi",
        height: "100%",
       
        allDaySlot: true,

        navLinks: false,

        weekText: "T",

        datesSet: (date) => {
            this.calendarService.loadEvents();
        }
    };

    constructor(private router: Router, calendarService: CalendarService) {
        super(calendarService);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        //Lấy api của full calendar
        this.calendarApi = this.calendar.getApi();

        //Chuyển tới ngày theo yêu cầu
        if (history.state.data?.date) {
            this.calendarApi.gotoDate(history.state.data.date);
        }

        this.setupEventSources();
    }
    
    ngOnDestroy() {
        this.eventSrcSub.unsubscribe();
    }
}