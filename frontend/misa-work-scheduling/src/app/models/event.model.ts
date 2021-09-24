export class CalendarEvent {
    constructor(
        public eventId: string,
        public title: string,
        public content: string,
        public employeeId: string,
        public startTime: Date,
        public endTime: Date,
        public currentStatus: number,
        public approverId: string,
        public createdAt: Date,
    ) {
        
    }

    get start() {
        return this.startTime;
    }

    get end() {
        return this.endTime;
    }
}