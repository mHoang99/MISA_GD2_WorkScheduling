import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { CalendarEvent } from "src/app/models/event.model";

@Component({
    selector: "app-pending-event-list",
    templateUrl: "./event-list.component.html",
    styleUrls: ["./event-list.component.scss"]
})
export class PendingEventListComponent implements OnInit, OnChanges {
    @Input() eventList: CalendarEvent[] = [];
    @Input() isLoading: boolean = false;

    @Output() selectEvent = new EventEmitter()
    @Output() approveEvent = new EventEmitter()
    @Output() deleteEvent = new EventEmitter()
    @Output() approveMultipleEvents = new EventEmitter()
    @Output() deleteMultipleEvents = new EventEmitter()

    private _isCheckAll: boolean = false;
    get isCheckAll() {
        return this._isCheckAll
    }

    set isCheckAll(value) {
        this._isCheckAll = value;
        this.isCheck = [];
        for (let i = 0; i < this.eventList.length; i++) {
            this.isCheck[i] = value;
        }
    }

    isCheck: boolean[] = [];

    get isMultipleMode(): boolean {
        return this.isCheck.filter((value) => {
            return value;
        }).length > 1
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.eventList?.currentValue !== changes.eventList?.previousValue) {
            console.log("list changed");
            this.isCheckAll = false;
        }
    }

    selectEventRow(eventId: string) {
        this.selectEvent.emit(eventId)
    }


    checkBoxModalValueChange(value: boolean) {
        if (this._isCheckAll && !value) {
            this._isCheckAll = false;
        }

        if (!this._isCheckAll && value) {
            if (this.isCheck.indexOf(false) < 0) {
                this._isCheckAll = true;
            }
        }
    }

    getListOfCheckedEventId() {
        let arr: string[] = [];

        this.eventList.forEach((event, index) => {
            if (this.isCheck[index] === true) {
                arr.push(event.eventId)
            }
        })

        console.log(arr);

        return arr;
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }
}




