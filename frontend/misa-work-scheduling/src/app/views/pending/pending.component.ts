import { Component, OnInit } from "@angular/core";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";
import { GroupService } from "src/app/services/http/group.service";

@Component({
    selector: "app-pending-list-view",
    templateUrl: "./pending.component.html",
    styleUrls: ["./pending.component.scss"]
})
export class PendingViewComponent implements OnInit {
    public groupList: any[];

    public groupEventList: CalendarEvent[];

    public selectedGroupId: string;

    public selectedEventId: string;

    get selectedEvent(): CalendarEvent {
        return this.groupEventList?.find((element) => {
            return element.eventId == this.selectedEventId
        }) ?? null;
    }

    public popupMessage: string = "";

    isDeleteOnePopupShow = false;

    isDeleteManyPopupShow = false;

    popupLoading = false;

    eventListLoading = false;

    groupListLoading = false;

    eventIdsToBeDeleted: string[] = [];


    constructor(private groupService: GroupService, private eventService: EventService) { }

    ngOnInit() {
        // gọi api
        this.groupListLoading = true;
        this.groupService.getManagedByUser().subscribe(
            resData => {
                if (resData) {
                    this.groupList = [...resData].sort((firstEl, secondEl) => {
                        return secondEl['groupName'] > firstEl['GroupName'] ? 1 : -1
                    })
                }
                console.log(this.groupList)
                this.groupListLoading = false;
            }, error => {
                console.log(error);
                this.groupListLoading = false;
            }
        )
    }

    groupSelect(id: string) {
        this.selectedGroupId = id;
        this.loadGroupEventList();
    }

    loadGroupEventList() {
        this.eventListLoading = true;
        this.eventService.getByGroup(this.selectedGroupId).subscribe(
            resData => {
                if (resData) {
                    this.groupEventList = [...resData].sort((firstEl, secondEl) => {
                        return secondEl['createdAt'] < firstEl['createdAt'] ? 1 : -1
                    });

                    let groupIdx = this.groupList.findIndex((el => el.groupId === this.selectedGroupId))
                    this.groupList[groupIdx]['pendingEventCount'] = this.groupEventList.length
                }
                console.log(this.groupEventList)
                this.eventListLoading = false;
            }, error => {
                console.log(error);
                this.eventListLoading = false;
            }
        )
    }

    eventSelect(id: string) {
        this.selectedEventId = id;
    }

    eventDelete(id: string) {
        this.eventIdsToBeDeleted = [];
        this.eventIdsToBeDeleted.push(id);
        this.popupMessage = "Bạn có chắc chắn muốn xóa sự kiện này không?"
        this.isDeleteOnePopupShow = true;
        //Popup
    }

    eventApprove(id: string) {
        this.sendApproveRequest([id])
    }

    multipleEventsDelete(ids: string[]) {
        this.eventIdsToBeDeleted = [...ids];
        this.popupMessage = `Bạn có chắc chắn muốn xóa ${ids.length} sự kiện đã chọn không?`
        this.isDeleteManyPopupShow = true;
    }

    multipleEventsApprove(ids: string[]) {
        this.sendApproveRequest([...ids])
    }

    sendDeleteRequest() {
        this.popupLoading = true;
        this.eventService.deleteMultiple(this.eventIdsToBeDeleted).subscribe(
            rowCount => {
                console.log(rowCount);
                if (rowCount > 0) {
                    this.isDeleteManyPopupShow = false;
                    this.isDeleteOnePopupShow = false;
                    this.popupLoading = false;
                    this.loadGroupEventList();
                }
            },
            err => {
                console.log(err);
                this.popupLoading = false;
            }
        );
    }

    sendApproveRequest(ids: string[]) {
        this.eventListLoading = true;
        this.eventService.approveMultiple(ids).subscribe(
            rowCount => {
                console.log(rowCount);
                if (rowCount > 0) {
                    this.loadGroupEventList();
                }
            },
            err => {
                console.log(err);
                this.eventListLoading = false;
            }
        );
    }
}
