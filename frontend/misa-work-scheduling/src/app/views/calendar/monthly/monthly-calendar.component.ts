import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { BaseCalendarView, DEFAULT_CALENDAR_OPTIONS } from "../base-calendar-view";
import { CalendarService } from "../calendar.service";

@Component({
    selector: "app-monthly-calendar-view",
    templateUrl: "./monthly-calendar.component.html",
    styleUrls: ["./monthly-calendar.component.scss"]
})
export class MonthlyCalendarViewComponent extends BaseCalendarView implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    @Output() eventClick = new EventEmitter();

    calendarOptions: CalendarOptions = {
        ...DEFAULT_CALENDAR_OPTIONS,

        initialView: 'dayGridMonth',

        stickyHeaderDates: false,

        selectable: true,

        navLinks: true,

        weekNumbers: true,

        eventDisplay: "list-item",

        /**
         * Hàm xử lý khi bấm vào 1 event
         * @param info 
         */
        eventClick: (info) => {
            console.log(info);
            this.eventClick.emit(info);
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
         * Hàm handle bấm vào 1 ngày
         * @param date 
         */
        navLinkWeekClick: (date) => {
            //navigate sang trang xem theo tuần
            this.router.navigate(["calendar/weekly"], { state: { data: { date: date } } });
        },

        /**
         * Hàm handle khi set lại ngày
         * @param date 
         */
        datesSet: (date) => {
            this.loadEvents(date.start, date.end);
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
