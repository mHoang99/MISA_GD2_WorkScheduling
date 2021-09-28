import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"]
})
export class AuthComponent {
    isLoading = false;
    error: string = "";

    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Handle sự kiện form submit
     * @param form 
     * @returns 
     */
    onSubmit(form: NgForm) {
        //Kiểm tra form valid
        if (!form.valid) {
            return;
        }

        const username = form.value.username;
        const password = form.value.password;

        this.isLoading = true;

        //Gọi api login từ service 
        this.authService.login(username, password).subscribe(
            resData => {
                if (!resData.success) {
                    this.error = resData['userMsg']
                }
                else {
                    this.router.navigate(['/calendar'])
                }
                this.isLoading = false;
            },
            error => {
                console.log(error);
                this.error = error
                this.isLoading = false;
            },
        );

        //reset lại form
        form.reset();
    }
}
