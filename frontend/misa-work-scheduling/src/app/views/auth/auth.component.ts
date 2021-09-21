import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error:string = "";

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const username = form.value.username;
        const password = form.value.password;

        this.isLoading = true;

        this.authService.login(username, password).subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                if(!resData.user) {
                    this.error = resData['userMsg']
                }
                else {
                    this.router.navigate([''])
                }
            },
            error => {
                console.log(error);
                this.error = error
                this.isLoading = false;
            }
        );

        form.reset();
        this.router.navigate(['calendar'])
    }
}
