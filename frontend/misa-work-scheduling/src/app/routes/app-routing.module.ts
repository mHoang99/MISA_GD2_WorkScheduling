import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../views/auth/auth.component';
import { CalendarViewComponent } from '../views/calendar/calendar.component';
import { DailyCalendarViewComponent } from '../views/calendar/daily/daily-calendar.component';
import { MonthlyCalendarViewComponent } from '../views/calendar/monthly/monthly-calendar.component';
import { WeeklyCalendarViewComponent } from '../views/calendar/weekly/weekly-calendar.component';
import { PendingViewComponent } from '../views/pending/pending.component';
import { HomeComponent } from '../views/home/home.component';
import { AnonymousGuard } from './anonymous.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, canActivate: [AnonymousGuard] },
    {
        path: 'calendar', canActivate: [AuthGuard], component: CalendarViewComponent, children: [
            {
                path: '',
                redirectTo: 'daily',
                pathMatch: 'full'
            },
            { path: 'monthly', component: MonthlyCalendarViewComponent },
            { path: 'weekly', component: WeeklyCalendarViewComponent },
            { path: 'daily', component: DailyCalendarViewComponent }
        ]
    },
    {
        path: 'pending', component: PendingViewComponent,
        canActivate: [AuthGuard],
        data: {
            role: '1'
        }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
