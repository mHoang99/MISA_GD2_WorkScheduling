import { Component, OnInit } from "@angular/core";
import { CalendarEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/http/event.service";
import { GroupService } from "src/app/services/http/group.service";
import { NotificationService } from "../../components/layouts/notification/notification.service";

@Component({
    selector: "app-pending-list-view",
    templateUrl: "./pending.component.html",
    styleUrls: ["./pending.component.scss"]
})
export class PendingViewComponent implements OnInit {
    //Danh sách group
    public groupList: any[];
    //Danh sách event
    public groupEventList: CalendarEvent[];
    //GroupId đang được chọn
    public selectedGroupId: string;
    //EventId đang được chọn
    public selectedEventId: string;

    //Event đang được chọn
    get selectedEvent(): CalendarEvent {
        return this.groupEventList?.find((element) => {
            return element.eventId == this.selectedEventId
        }) ?? null;
    }

    popupMessage: string = "";

    isDeleteOnePopupShow = false;

    isDeleteManyPopupShow = false;

    popupLoading = false;

    eventListLoading = false;

    groupListLoading = false;

    eventIdsToBeDeleted: string[] = [];


    constructor(private groupService: GroupService, private eventService: EventService, private notificationService: NotificationService) { }

    ngOnInit() {
        // gọi api
        this.groupListLoading = true;
        this.groupService.getManagedByUser().subscribe(
            resData => {
                if (resData.success) {
                    this.groupList = [...resData.data]
                        .sort((firstEl, secondEl) => {
                            //sắp xếp theo tên group
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

    /**
     * Handle group được chọn
     * @param id 
     */
    groupSelect(id: string) {
        if (this.selectedGroupId != id) {
            this.selectedEventId = "";
            this.selectedGroupId = id;

            //load danh sách event của grop
            this.loadGroupEventList();
        }
    }

    /**
     * Load danh sách sự kiện của group
     */
    loadGroupEventList() {
        this.eventListLoading = true;

        //Gọi api
        this.eventService.getByGroup(this.selectedGroupId).subscribe(
            resData => {
                if (resData) {
                    if (resData.success) {
                        this.groupEventList = [...resData.data]
                            .sort((firstEl, secondEl) => {
                                //sắp xếp theo ngày tạo
                                return secondEl['createdAt'] < firstEl['createdAt'] ? 1 : -1
                            });

                        //Sửa lại số chờ còn lại của group    
                        let groupIdx = this.groupList.findIndex((el => el.groupId === this.selectedGroupId))
                        this.groupList[groupIdx]['pendingEventCount'] = this.groupEventList.length
                    }
                }
                this.eventListLoading = false;
            }, error => {
                console.log(error);
                this.eventListLoading = false;
            }
        )
    }

    /**
     * Handle chọn event
     * @param id 
     */
    eventSelect(id: string) {
        this.selectedEventId = id;
    }

    /**
     * Handle xóa 1 event
     * @param id 
     */
    eventDelete(id: string) {
        this.eventIdsToBeDeleted = [];
        this.eventIdsToBeDeleted.push(id);
        this.popupMessage = "Bạn có chắc chắn muốn xóa sự kiện này không?"
        this.isDeleteOnePopupShow = true;
        //Popup
    }

    /**
     * Handle duyệt 1 event
     * @param id 
     */
    eventApprove(id: string) {
        this.sendApproveRequest([id])
    }

    /**
     * Handle xóa nhiều event
     * @param ids 
     */
    multipleEventsDelete(ids: string[]) {
        this.eventIdsToBeDeleted = [...ids];
        this.popupMessage = `Bạn có chắc chắn muốn xóa ${ids.length} sự kiện đã chọn không?`
        this.isDeleteManyPopupShow = true;
    }

    /**
     * Handle duyệt nhiều event
     * @param ids
     */
    multipleEventsApprove(ids: string[]) {
        this.sendApproveRequest([...ids])
    }

    /**
     * Gửi request xóa
     */
    sendDeleteRequest() {
        this.popupLoading = true;
        this.eventService.deleteMultiple(this.eventIdsToBeDeleted).subscribe(
            resData => {
                if (resData.success) {
                    this.isDeleteManyPopupShow = false;
                    this.isDeleteOnePopupShow = false;
                    this.popupLoading = false;

                    //Load lại
                    this.loadGroupEventList();
                    //Hiện thông báo
                    this.notificationService.addSuccessNotification(`Xóa thành công ${resData.data} sự kiện`);
                }
            },
            err => {
                console.log(err);
                this.popupLoading = false;
            }
        );
    }

    /**
     * Gửi request duyệt
     * @param ids 
     */
    sendApproveRequest(ids: string[]) {
        this.eventListLoading = true;
        this.eventService.approveMultiple(ids).subscribe(
            resData => {
                if (resData.success) {
                    //Load lại
                    this.loadGroupEventList();
                    //Hiện thông báo
                    this.notificationService.addSuccessNotification(`Phê duyệt thành công ${resData.data} sự kiện`);
                }
            },
            err => {
                console.log(err);
                this.eventListLoading = false;
            }
        );
    }
}
