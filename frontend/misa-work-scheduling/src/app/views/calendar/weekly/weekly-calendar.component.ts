import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar, CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { BaseCalendarView, DEFAULT_CALENDAR_OPTIONS } from "../base-calendar-view";
import { CalendarService } from "../calendar.service";

@Component({
    selector: "app-weekly-calendar-view",
    templateUrl: "./weekly-calendar.component.html",
    styleUrls: ["./weekly-calendar.component.scss"]
})
export class WeeklyCalendarViewComponent extends BaseCalendarView implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    @Output() eventClick = new EventEmitter();

    //options cho fullcalendar
    calendarOptions: CalendarOptions = {
        ...DEFAULT_CALENDAR_OPTIONS,
        initialView: 'timeGridWeek',

        allDaySlot: false, //Không cho phép hiện ô sự kiện cả ngày

        weekText: "T",

        navLinks: true,

        dayHeaderFormat: {
            weekday: 'narrow',
            month: 'numeric',
            day: 'numeric',
            omitCommas: true
        },

        /**
        * Hàm handle bấm vào 1 tuần
        * @param date 
        */
        navLinkDayClick: (date) => {
            //navigate sang trang xem theo ngày
            this.router.navigate(["calendar/daily"], { state: { data: { date: date } } });
        },

        /**
         * Hàm handle khi set lại ngày
         * @param date 
         */
        datesSet: (date) => {
            this.loadEvents(date.start, date.end);
        },

        /**
         * Hàm xử lý khi bấm vào 1 event
         * @param info 
         */
         eventClick: (info) => {
            this.eventClick.emit(info);
        },
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