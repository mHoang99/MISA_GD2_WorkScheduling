import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

/**
 * Interface cho việc hiển thị group
 */
interface DisplayGroup {
    groupId: string,
    groupName: string,
    groupCode: string,
    pendingEventCount: number
}

@Component({
    selector: "app-group-list",
    templateUrl: "./group-list.component.html",
    styleUrls: ["./group-list.component.scss"]
})
export class GroupListComponent implements OnInit {
    //Danh sách group
    @Input() groupList: DisplayGroup[];
    //Group đang được chọn
    @Input() selectedGroupId: string;
    //Đang loading
    @Input() isLoading: boolean = false;

    @Output() groupSelect = new EventEmitter();


    constructor() { }

    ngOnInit() {
    }

    /**
     * chọn 1 group
     * @param groupId 
     */
    groupClick(groupId: string) {
        this.groupSelect.emit(groupId);
    }

}
