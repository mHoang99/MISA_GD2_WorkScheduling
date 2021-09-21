import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../views/auth/auth.component';
import { HomeComponent } from '../views/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'calendar', canActivate: [AuthGuard], component: AuthComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
