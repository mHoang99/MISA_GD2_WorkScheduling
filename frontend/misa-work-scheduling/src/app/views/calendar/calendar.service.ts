import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { STATUS_COLOR } from "src/app/common/consts/color";
import { CalendarEvent } from "src/app/models/event.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { EventService } from "src/app/services/http/event.service";

/**
 * Nguồn sự kiện
 */
export interface EventSource {
    events: CalendarEvent[];
    color: string;
    textColor: string;
    editable: boolean;
}

/**
 * Màu cho từng nguồn sự kiện
 */
const colors = {
    completed: {
        color: STATUS_COLOR.COMPLETED,
        textColor: "white",
    },
    approved: {
        color: STATUS_COLOR.APPROVED,
        textColor: "",
    },
    pending: {
        color: STATUS_COLOR.PENDING,
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

    public eventSources = new BehaviorSubject<{
        completedEventSource: EventSource,
        approvedEventSource: EventSource,
        pendingEventSource: EventSource
    }>({
        completedEventSource: this.completedEventSource,
        approvedEventSource: this.approvedEventSource,
        pendingEventSource: this.pendingEventSource
    });

    //thời gian đâu
    private startDate: Date;
    //thời gian cuối
    private endDate: Date;

    constructor(private eventService: EventService, private authService: AuthService) {
        authService.user.subscribe(_ => {
            //Cho trường hợp người dùng đổi user
            this.startDate = undefined;
            this.endDate = undefined;
        })
    }

    /**
     * load sự kiện theo khoảng thời gian
     * @param start thời gian đầu
     * @param end thời gian cuối
     */
    public loadEvents(start: Date, end: Date) {

        // console.log(start >= this.startDate)
        // console.log(end <= this.endDate)

        //Nêu ngày nằm trong khoảng dữ liệu có sẵn thì không load lại
        if (start >= this.startDate && end <= this.endDate) {
            return;
        }

        //Chọn 1 ngày ở giữa 2 ngày
        let middleDate = new Date()
        middleDate.setTime(start.getTime() + (16 * 24 * 60 * 60 * 1000)) // + 16 ngày

        //Lấy số quý
        let quarter = Math.floor((middleDate.getMonth() + 3) / 3);

        //Ngày đầu quý
        this.startDate = new Date(`${middleDate.getFullYear()}-${quarter * 3 - 2}-01`)
        //Giảm 2 tuần
        this.startDate.setTime(this.startDate.getTime() - (14 * 24 * 60 * 60 * 1000)) // - 2 tuần

        //Ngày gần cuối quý
        this.endDate = new Date(`${middleDate.getFullYear()}-${quarter * 3}-30`)
        //Tăng thêm 2 tuần
        this.endDate.setTime(this.endDate.getTime() + (14 * 24 * 60 * 60 * 1000)) // + 2 tuần

        //Gửi yêu cầu
        this.sendLoadRequest();
    }

    /**
     * Load lại dữ liệu
     */
    public reloadEvents() {
        //Gửi yêu cầu
        this.sendLoadRequest();
    }

    /**
     * Hàm handle gửi và nhận dữ liệu
     */
    public sendLoadRequest() {
        //Gọi service
        this.eventService.getEventsByRange(this.startDate, this.endDate).subscribe(
            resData => {
                //Thành công
                if (resData.success) {
                    let events = [...resData.data]

                    //Set rỗng
                    this.completedEventSource.events = [];
                    this.approvedEventSource.events = [];
                    this.pendingEventSource.events = [];

                    events.forEach((event, index) => {
                        //Tạo 1 event mới
                        let tmpEvent = new CalendarEvent(
                            event.eventId,
                            event.title,
                            event.content,
                            event.employeeId,
                            event.employeeCode,
                            event.fullName,
                            event.approverId,
                            event.approverCode,
                            event.approverName,
                            event.groupId,
                            event.startTime,
                            event.endTime,
                            event.currentStatus,
                            event.createdAt
                        );

                        switch (tmpEvent.currentStatus) {
                            case 0:
                                this.pendingEventSource.events.push(tmpEvent);
                                break;
                            case 1:
                                this.approvedEventSource.events.push(tmpEvent);
                                break;
                            case 2:
                                this.completedEventSource.events.push(tmpEvent);
                                break;
                            default:
                                console.log(tmpEvent.currentStatus)
                                break;
                        }
                    })

                    //update
                    this.eventSources.next({
                        completedEventSource: this.completedEventSource,
                        approvedEventSource: this.approvedEventSource,
                        pendingEventSource: this.pendingEventSource
                    })
                }
            },
            err => {
                this.startDate = undefined;
                this.endDate = undefined;
                console.log(err)
            }
        )
    }

    /**
     * Tìm event trong sources theo id
     * @param id 
     * @returns 
     */
    public findEventById(id: string): CalendarEvent {
        //Tìm ở trong list đã được duyệt
        let res = this.eventSources.value.approvedEventSource.events.find((el) => {
            return el.eventId == id
        })

        if (res) {
            return res;
        }

        //Tìm ở trong list đã hoàn thành
        res = this.eventSources.value.completedEventSource.events.find((el) => {
            return el.eventId == id
        })

        if (res) {
            return res;
        }

        //Tìm ở trong list chưa được duyệt
        res = this.eventSources.value.pendingEventSource.events.find((el) => {
            return el.eventId == id
        })

        return res;
    }
}