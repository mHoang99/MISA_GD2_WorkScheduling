import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CalendarEvent } from "src/app/models/event.model";

@Component({
    selector: "app-event-card",
    templateUrl: "./event-card.component.html",
    styleUrls: ["./event-card.component.scss"]
})
export class EventDetailsCardComponent implements OnInit {
    @Input() event: CalendarEvent;
    @Input() mode: string; // "approve" | "view"
    
    @Output() eventApprove = new EventEmitter()
    @Output() eventComplete = new EventEmitter()
    @Output() eventClose = new EventEmitter()
    @Output() eventDelete = new EventEmitter()
    
    deleteBtnClick() {
        console.log('click')
        this.eventDelete.emit(this.event.eventId);
    }

    ngOnInit() {
    }
}
