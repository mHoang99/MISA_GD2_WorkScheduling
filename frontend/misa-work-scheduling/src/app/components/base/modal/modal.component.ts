import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() isShow = false; 
    @Input() isLoading = true; 
    @Output() isShowChange = new EventEmitter();

    onBackdropClick(event) {
        this.closePopup();
    }

    closePopup() {
        this.isShowChange.emit(false);
    }
}