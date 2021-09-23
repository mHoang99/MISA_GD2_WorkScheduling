import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Calendar, CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";

@Component({
    selector: "app-daily-calendar-view",
    templateUrl: "./daily-calendar.component.html",
    styleUrls: ["./daily-calendar.component.scss"]
})
export class DailyCalendarViewComponent {
    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    private calendarApi: Calendar;

    calendarOptions: CalendarOptions = {
        initialView: 'timeGridDay',
        locale: "vi",
        height: "100%",
        stickyHeaderDates: false,
        allDaySlot: false,
        headerToolbar: {
            start: 'title', 
            center: '',
            end: 'today prev,next'
        },

        dayHeaders: true,

        navLinks: false,

        nowIndicator: true,

        dayHeaderFormat: {
            weekday: 'long',
            omitCommas: true
        },

        //Danh sách các sự kiện
        eventSources: [
            {
              events: [ // put the array in the `events` property
                {
                  title  : 'event1',
                  start  : '2021-09-22T09:49:08.656Z',
                  end  : '2021-09-22T10:49:08.656Z'
                },
                {
                  title  : 'event2',
                  start  : '2021-01-05',
                  end    : '2021-01-07'
                },
                {
                  title  : 'event3',
                  start  : '2021-01-09T12:30:00',
                }
              ],
              color: 'black',     // an option!
              textColor: 'yellow' // an option!
            }
        ],

        slotDuration: "00:15:00",
        slotMinTime: "09:00:00",
        slotMaxTime: "18:00:01",

        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short',
            hour12: false,
        },

        buttonText: {
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            list: 'Danh sách'
        },
    };

    constructor(
        private route: ActivatedRoute
    ) {
        console.log(this.route.data)
    }

    ngAfterViewInit() {
        //Lấy api của full calendar
        this.calendarApi = this.calendar.getApi();

        //Chuyển tới ngày theo yêu cầu
        if (history.state.data?.date) {
            this.calendarApi.gotoDate(history.state.data.date);
        }
    }
}