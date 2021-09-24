import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing.module';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/sidebar/sidebar.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoadingSpinnerComponent } from './components/base/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { HomeComponent } from './views/home/home.component';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MonthlyCalendarViewComponent } from './views/calendar/monthly/monthly-calendar.component';
import { CalendarViewComponent } from './views/calendar/calendar.component';
import { WeeklyCalendarViewComponent } from './views/calendar/weekly/weekly-calendar.component';
import { DailyCalendarViewComponent } from './views/calendar/daily/daily-calendar.component';
import { ModalComponent } from './components/base/modal/modal.component';
import { CalendarAddFormComponent } from './views/calendar/add-form/add-form.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin,
    bootstrapPlugin
])

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        AuthComponent,
        LoadingSpinnerComponent,
        HomeComponent,
        MonthlyCalendarViewComponent,
        WeeklyCalendarViewComponent,
        DailyCalendarViewComponent,
        CalendarViewComponent,
        CalendarAddFormComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule,
        FullCalendarModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
