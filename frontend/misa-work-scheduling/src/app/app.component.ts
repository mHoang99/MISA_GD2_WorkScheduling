import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'misa-work-scheduling';

    constructor(private authService: AuthService) { }

    ngOnInit() {
        //Tự động login khi khởi chạy
        this.authService.autoLogin();
    }
}
