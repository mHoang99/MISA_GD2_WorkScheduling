import * as internal from "stream";

export class CalendarEvent {
    constructor(
        public eventId: string,
        public title: string,
        public content: string,
        public EmployeeId: string,
        public StartTime: Date,
        public EndTime: Date,
        public currentStatus: number,
        public approverId: string,
        public createdAt: string,
    ) {}
}