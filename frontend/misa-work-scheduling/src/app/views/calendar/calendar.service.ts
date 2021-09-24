import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";

export interface EventSource {
    events: CalendarEvent[];
    color: string;
    textColor: string;
    editable: boolean;
}

const colors = {
    completed: {
        color: "grey",
        textColor: "white",
    },
    approved: {
        color: "",
        textColor: "",
    },
    pending: {
        color: "orange",
        textColor: "white"
    }
}

@Injectable({ providedIn: 'root' })
export class CalendarService {
    public completedEventSource = {
        events: [],
        color: colors.completed.color,
        textColor: colors.completed.textColor,
        editable: true
    };

    public approvedEventSource = {
        events: [],
        color: colors.approved.color,
        textColor: colors.approved.textColor,
        editable: true
    };

    public pendingEventSource = {
        events: [],
        color: colors.pending.color,
        textColor: colors.pending.textColor,
        editable: true
    };

    public EventSources = new BehaviorSubject<{
        completedEventSource: EventSource,
        approvedEventSource: EventSource,
        pendingEventSource: EventSource
    }>({
        completedEventSource: this.completedEventSource,
        approvedEventSource: this.approvedEventSource,
        pendingEventSource: this.pendingEventSource
    });

    constructor(private eventService: EventService) {
    }

    public loadEvents() {
        this.eventService.getAllEvents().subscribe(
            events => {
               this.completedEventSource.events = [];
               this.approvedEventSource.events = [];
               this.pendingEventSource.events = [];

                events.forEach((event, index) => {
                    let tmpEvent = new CalendarEvent(
                        event['EventId'],
                        event['Title'],
                        event['Content'],
                        event['EmployeeId'],
                        event['StartTime'],
                        event['EndTime'],
                        event['CurrentStatus'],
                        event['ApproverId'],
                        event['CreatedAt']
                    );

                    switch (tmpEvent.currentStatus) {
                        case 0:
                            this.completedEventSource.events.push(tmpEvent);
                            break;
                        case 1:
                            this.approvedEventSource.events.push(tmpEvent);
                            break;
                        case 2:
                            this.pendingEventSource.events.push(tmpEvent);
                            break;
                        default:
                            console.log(tmpEvent.currentStatus)
                            break;
                    }
                })

                this.EventSources.next({
                    completedEventSource: this.completedEventSource,
                    approvedEventSource: this.approvedEventSource,
                    pendingEventSource: this.pendingEventSource
                })
            },
            err => {
                console.log(err)
            }
        )
    }


}