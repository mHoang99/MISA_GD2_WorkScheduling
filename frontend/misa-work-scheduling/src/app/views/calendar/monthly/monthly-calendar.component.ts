import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Calendar, CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { BaseCalendarView, DEFAULT_CALENDAR_OPTIONS } from "../base-calendar-view";
import { CalendarService, EventSource } from "../calendar.service";

@Component({
    selector: "app-monthly-calendar-view",
    templateUrl: "./monthly-calendar.component.html",
    styleUrls: ["./monthly-calendar.component.scss"]
})
export class MonthlyCalendarViewComponent extends BaseCalendarView implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    calendarOptions: CalendarOptions = {
        ...DEFAULT_CALENDAR_OPTIONS,
        
        initialView: 'dayGridMonth',

        stickyHeaderDates: false,

        selectable: true,

        /**
         * Hàm xử lý khi bấm vào 1 ô ngày trong lịch
         * @param info 
         */
        dateClick: (info) => {
        },

        navLinks: true,

        weekNumbers: true,

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

        datesSet: (date) => {
            console.log(date);
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
