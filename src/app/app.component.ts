import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayActivitiesComponent } from './day-activities/day-activities.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ActivitiesComponent, CalendarComponent, DayActivitiesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App Gym';
  
}
