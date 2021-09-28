import { Calendar, CalendarOptions } from "@fullcalendar/core";
import { Subscription } from "rxjs";
import { CalendarService } from "./calendar.service";

/**
 * Config cho full calendar
 */
export const DEFAULT_CALENDAR_OPTIONS: CalendarOptions =
{
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

    dayHeaderFormat: {
        weekday: 'long',
        omitCommas: true
    },

    weekText: "Tuần ",

    weekNumbers: true,

    nowIndicator: true,

    titleFormat: {
        year: 'numeric',
        month: '2-digit'
    },

    slotDuration: "00:15:00",

    businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday

        startTime: '08:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
    },

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

    eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false
    },

    firstDay: 1,

    dayMaxEventRows: 3,

    editable: false,

    droppable: false,
};



export class BaseCalendarView {
    protected calendarApi: Calendar;

    protected eventSrcSub: Subscription;

    constructor(protected calendarService: CalendarService) { }

    /**
     * Thiết lập kho lưu sự kiện
     */
    setupEventSources() {
        this.eventSrcSub = this.calendarService.eventSources.subscribe(
            eventSources => {
                this.calendarApi.removeAllEventSources();
                this.calendarApi.addEventSource(eventSources.approvedEventSource)
                this.calendarApi.addEventSource(eventSources.pendingEventSource)
                this.calendarApi.addEventSource(eventSources.completedEventSource)
            }
        )
    }

    /**
     * Load dữ liệu về sự kiện theo khoảng thời gian
     * @param start bắt đầu
     * @param end kết thúc
     */
    loadEvents(start: Date, end: Date) {
        this.calendarService.loadEvents(start, end);
    }
}