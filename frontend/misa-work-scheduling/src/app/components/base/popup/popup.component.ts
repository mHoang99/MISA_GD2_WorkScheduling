import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-popup",
    templateUrl: "./popup.component.html",
    styleUrls: ["./popup.component.scss"]
})
export class PopupComponent implements OnInit {
    @Input() message: string = "";
    @Input() type: string = "success"; //success | warning | confirm  
    @Input() isShow: boolean = false;
    @Input() isLoading: boolean = false;

    @Output() confirmBtnClick = new EventEmitter();
    @Output() closeBtnClick = new EventEmitter();

    //Màu của icon
    get iconColor(): string {
        switch (this.type) {
            case "success":
                return "green"
            case "warning":
                return "orangered"
            case "confirm":
                return "blue"
            default:
                return ""
        }
    }

    ngOnInit() {
    }
}
