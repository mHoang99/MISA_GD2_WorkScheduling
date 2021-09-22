import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Calendar, CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";

@Component({
    selector: "app-weekly-calendar-view",
    templateUrl: "./weekly-calendar.component.html",
    styleUrls: ["./weekly-calendar.component.scss"]
})
export class WeeklyCalendarViewComponent implements AfterViewInit {

    @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

    private calendarApi: Calendar;

    calendarOptions: CalendarOptions = {
        initialView: 'timeGridWeek',
        locale: "vi",
        height: "100%",
        stickyHeaderDates: false,
        allDaySlot: false,
        headerToolbar: {
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: '',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
        },
        titleFormat: {
            year: 'numeric',
            month: '2-digit'
        },

        nowIndicator: true,

        dayHeaderFormat: {
            weekday: 'narrow',
            month: 'numeric',
            day: 'numeric',
            omitCommas: true
        },

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
        events: [
            {
                title: 'dynamic event',
                start: new Date(),
                allDay: true
            }
        ]

    };


    constructor(
        private route: ActivatedRoute
    ) {
        console.log(this.route.data)
    }

    ngAfterViewInit() {
        this.calendarApi = this.calendar.getApi();

        if (history.state.data?.date) {
            this.calendarApi.gotoDate(history.state.data.date);
        }

        this.calendarApi.addEvent({
            event: {
                id: 'a',
                title: 'Di choi',
                start: new Date(),
                end: new Date(new Date().getTime() + 100000)
            }
        })
    }

}