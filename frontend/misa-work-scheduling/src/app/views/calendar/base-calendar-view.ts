import { Calendar, CalendarOptions } from "@fullcalendar/core";
import { Subscription } from "rxjs";
import { CalendarService } from "./calendar.service";

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
    slotMinTime: "09:00:00",
    slotMaxTime: "18:00:00",

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
    dayMaxEventRows: 3
};



export class BaseCalendarView {
    protected calendarApi: Calendar;

    protected eventSrcSub: Subscription;

    constructor(protected calendarService: CalendarService) { }

    setupEventSources() {
        this.eventSrcSub = this.calendarService.EventSources.subscribe(
            eventSources => {
                this.calendarApi.removeAllEventSources();
                this.calendarApi.addEventSource(eventSources.approvedEventSource)
                this.calendarApi.addEventSource(eventSources.pendingEventSource)
                this.calendarApi.addEventSource(eventSources.completedEventSource)
            }
        )
    }
}