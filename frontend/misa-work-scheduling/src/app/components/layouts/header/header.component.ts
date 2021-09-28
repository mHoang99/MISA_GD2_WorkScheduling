import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;

    private userSub: Subscription;

    user: User;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        //subscribe user trong auth service
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            this.user = user;
        });
    }

    /**
     * Hàm handle login
     */
    onLogin() {
        this.router.navigate(['/auth']);
    }

    /**
     * Hàm handle logout
     */
    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}
