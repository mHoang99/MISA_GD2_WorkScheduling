import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

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
    @Input() groupList: DisplayGroup[];
    @Input() isLoading: boolean = false;

    @Output() groupSelect = new EventEmitter();


    constructor() { }

    ngOnInit() {
    }

    groupClick(groupId: string) {
        console.log(groupId);
        this.groupSelect.emit(groupId);
    }

}
