import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MonitorsComponent } from './monitors/monitors.component';
export const routes: Routes = [
    { path: 'app-calendar', component: CalendarComponent },
    { path: 'app-monitors', component: MonitorsComponent},
];
