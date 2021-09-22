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

    private userSub : Subscription;

    user: User;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            this.user = user;
        });
    }

    onLogin() {
        this.router.navigate(['/auth']);
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}
