import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
    //Hiện modal
    @Input() isShow = false; 

    //Có thay đổi ẩn hiện
    @Output() isShowChange = new EventEmitter();

    /**
     * Handle ấn vào backdrop
     * @param event 
     */
    onBackdropClick(event) {
        this.closePopup();
    }

    /**
     * Đóng popup
     */
    closePopup() {
        this.isShowChange.emit(false);
    }
}