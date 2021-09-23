import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpService } from "./http.service";



export class EventService extends HttpService {

    protected defaultPath = "/Events";

    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

}
