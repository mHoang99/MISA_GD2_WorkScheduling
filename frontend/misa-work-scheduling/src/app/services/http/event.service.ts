import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';



export class EventService {
    constructor(private http: HttpClient, private router: Router) { }

    protected defaultPath = "/Events";

}
