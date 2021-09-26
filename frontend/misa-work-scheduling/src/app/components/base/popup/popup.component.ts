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

    ngOnInit() {
    }
}
