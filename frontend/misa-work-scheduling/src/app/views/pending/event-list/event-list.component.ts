import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { CalendarEvent } from "src/app/models/event.model";

@Component({
    selector: "app-pending-event-list",
    templateUrl: "./event-list.component.html",
    styleUrls: ["./event-list.component.scss"]
})
export class PendingEventListComponent implements OnInit, OnChanges {
    //Danh sách event
    @Input() eventList: CalendarEvent[] = [];
    //Đang loading
    @Input() isLoading: boolean = false;

    @Output() selectEvent = new EventEmitter()
    @Output() approveEvent = new EventEmitter()
    @Output() deleteEvent = new EventEmitter()
    @Output() approveMultipleEvents = new EventEmitter()
    @Output() deleteMultipleEvents = new EventEmitter()

    //check hết ô
    private _isCheckAll: boolean = false;

    get isCheckAll() {
        return this._isCheckAll
    }

    set isCheckAll(value) {
        this._isCheckAll = value;

        //Gán value cho isCheck
        this.isCheck = [];
        for (let i = 0; i < this.eventList.length; i++) {
            this.isCheck[i] = value;
        }
    }

    //Array kiểm tra các ô đã check
    isCheck: boolean[] = [];

    //Chế độ chọn nhiều
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
            //Bỏ check hết khi list thay đổi
            this.isCheckAll = false;
        }
    }

    /**
     * chọn 1 dòng
     * @param eventId 
     */
    selectEventRow(eventId: string) {
        this.selectEvent.emit(eventId)
    }


    /**
     * handle khi checkbox model thay đổi
     * @param value 
     */
    checkBoxModelValueChange(value: boolean) {
        //nếu đang check all mà ô này không được check  
        if (this._isCheckAll && !value) {
            //bỏ check all
            this._isCheckAll = false;
        }

        //nếu đang không check all mà ô này được check
        if (!this._isCheckAll && value) {
            //Nếu không còn ô nào không check thì check all
            if (this.isCheck.indexOf(false) < 0) {
                this._isCheckAll = true;
            }
        }
    }

    /**
     * Lấy danh sách sự kiện đã được chọn
     * @returns danh sách event đã check
     */
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

    /**
     * Theo dõi index trong ngfor
     * @param index 
     * @param obj 
     * @returns 
     */
    trackByIdx(index: number, obj: any): any {
        return index;
    }
}




