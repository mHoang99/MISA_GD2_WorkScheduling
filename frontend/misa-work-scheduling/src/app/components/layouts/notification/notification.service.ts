import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NOTI_TYPE } from "src/app/common/consts/notification";
import { v4 as uuid } from 'uuid';
export interface Notification {
    id: string,
    message: string,
    type: string
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

    //Danh sách thông báo
    public notiSources = new BehaviorSubject<Notification[]>([]);

    //Thời gian hiện của thông báo
    notiDuration = 3000;

    /**
     * thêm thông báo mới
     * @param notification thông báo
     */
    public addNotification(notification: Notification) {
        //tạo id
        notification.id = uuid();

        //thêm thông báo mới 
        let src = [notification, ...this.notiSources.value ?? []];
        
        this.notiSources.next(src);
        
        //Chờ để xóa 
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, this.notiDuration)
    }

    /**
     * Xóa thông báo theo id
     * @param id id của thông báo
     */
    public removeNotification(id: string) {
        //Lấy danh sách không chứa id
        let src = (this.notiSources.value ?? []).filter((value) => {
            return value.id != id
        })

        this.notiSources.next(src);
    }

    /**
     * thêm thông báo thành công
     * @param msg thông điệp
     */
    public addSuccessNotification(msg: string) {
        this.addNotification({
            message: msg,
            type: NOTI_TYPE.SUCCESS,
            id: ""
        })
    }

    /**
     * thêm thông báo thông tin
     * @param msg thông điệp
     */
    public addInfoNotification(msg: string) {
        this.addNotification({
            message: msg,
            type: NOTI_TYPE.INFO,
            id: ""
        })
    }

    /**
     * thêm cảnh báo
     * @param msg thông điệp
     */
    public addWarningNotification(msg: string) {
        this.addNotification({
            message: msg,
            type: NOTI_TYPE.WARNING,
            id: ""
        })
    }
}