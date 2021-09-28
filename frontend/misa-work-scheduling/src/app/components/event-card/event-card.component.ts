import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { STATUS_COLOR } from "src/app/common/consts/color";
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

    //Màu sắc của trạng thái
    get statusColor(): string {
        switch (this.event.currentStatus) {
            case 0:
                return STATUS_COLOR.PENDING;
            case 1:
                return STATUS_COLOR.APPROVED;
            case 2:
                return STATUS_COLOR.COMPLETED;
            default:
                return "";
        }
    }

    //Chữ hiển thị
    get statusText(): string {
        switch (this.event.currentStatus) {
            case 0:
                return "Đang chờ duyệt";
            case 1:
                return "Đã được duyệt";
            case 2:
                return "Đã hoàn thành";
            default:
                return "";
        }
    }

    ngOnInit() {
    }
}
