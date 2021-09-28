/**
 * Model cho sự kiện
 */
export class CalendarEvent {
    constructor(
        public eventId: string,
        public title: string,
        public content: string,
        public employeeId: string,
        public employeeCode: string,
        public fullName: string,
        public approverId: string,
        public approverCode: string,
        public approverName: string,
        public groupId: string,
        public startTime: Date,
        public endTime: Date,
        public currentStatus: number,
        public createdAt: Date,
    ) {

    }

    get id() {
        return this.eventId;
    }

    get start() {
        return this.startTime;
    }

    get end() {
        return this.endTime;
    }
}