import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isAuthenticated: boolean;

    isManager: boolean;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            this.isManager = user?.role == 1;
        })
    }

}
