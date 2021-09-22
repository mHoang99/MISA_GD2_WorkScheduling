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
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: '',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
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
        dateClick: (info) => {
            alert('Clicked on: ' + info.dateStr);
            alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            alert('Current view: ' + info.view.type);
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

        navLinkDayClick: (date) => {
            //navigate sang trang xem theo ngày
            this.router.navigate(["calendar/daily"], { state: { data: { date: date } } });
        },

        navLinkWeekClick: (date) => {
            //navigate sang trang xem theo tuần
            this.router.navigate(["calendar/weekly"], { state: { data: { date: date } } });
        }
    };


    constructor(private router: Router) {

    }
}
