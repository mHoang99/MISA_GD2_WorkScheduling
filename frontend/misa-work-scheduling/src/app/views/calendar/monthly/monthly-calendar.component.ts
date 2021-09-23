import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";

@Component({
    selector: "app-monthly-calendar-view",
    templateUrl: "./monthly-calendar.component.html",
    styleUrls: ["./monthly-calendar.component.scss"]
})
export class MonthlyCalendarViewComponent {
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        locale: 'vi',
        height: "100%",
        stickyHeaderDates: false,
        headerToolbar: {
            start: 'title',
            center: '',
            end: 'today prev,next'
        },
        titleFormat: {
            year: 'numeric',
            month: '2-digit'
        },
        buttonText: {
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            list: 'Danh sách'
        },
        showNonCurrentDates: true,

        selectable: true,

        /**
         * Hàm xử lý khi bấm vào 1 ô ngày trong lịch
         * @param info 
         */
        dateClick: (info) => {
            // info.dayEl.style.backgroundColor = 'red';
        },

        events: [
            {
                title: 'event1',
                start: '2021-09-22'
            },
            {
                title: 'event2',
                start: '2021-09-22',
                end: '2021-09-22'
            },
            {
                title: 'event3',
                start: '2021-09-09T23:30:00',
                allDay: false // will make the time show
            }
        ],

        navLinks: true,

        weekNumbers: true,

        weekText: "Tuần ",

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
        }
    };


    constructor(private router: Router) {

    }
}
