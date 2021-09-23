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

    //options cho fullcalendar
    calendarOptions: CalendarOptions = {
        initialView: 'timeGridWeek',
        locale: "vi",
        height: "100%",
        stickyHeaderDates: false,
        allDaySlot: false, //Không cho phép hiện ô sự kiện cả ngày
        headerToolbar: {
            start: 'title', 
            center: '',
            end: 'today prev,next' 
        }, //Thanh toolbar

        titleFormat: {
            year: 'numeric',
            month: '2-digit'
        }, //Format tiêu đề của lịch

        nowIndicator: true, 

        dayHeaderFormat: {
            weekday: 'narrow',
            month: 'numeric',
            day: 'numeric',
            omitCommas: true
        },

        slotDuration: "00:15:00", //Khoảng cách giữa 2 mốc thời gian
        slotMinTime: "09:00:00", //Thời gian bắt đầu
        slotMaxTime: "18:00:01", //Thời gian kết thúc
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
        // console.log(this.route.data)
    }

    ngAfterViewInit() {
        //Lấy các api được full calendar hỗ trợ
        this.calendarApi = this.calendar.getApi();

        //Di chuyển tới ngày được yêu cầu
        if (history.state.data?.date) {
            this.calendarApi.gotoDate(history.state.data.date);
        }

        // this.calendarApi.addEvent({
        //     event: {
        //         id: 'a',
        //         title: 'Di choi',
        //         start: new Date(),
        //         end: new Date(new Date().getTime() + 100000)
        //     }
        // })
    }

}