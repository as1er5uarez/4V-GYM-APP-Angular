import { Component } from '@angular/core';
import { Actividad } from '../models/actividad.model';
import { ActivityService } from '../activity.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-activities',
  template: '<app-calendar (activitiesByDate)="activitiesByDate($event)"></app-calendar>',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  actividades: Actividad[] = [];
  activitiesDate: Actividad[] = [];
  constructor(private activityService: ActivityService) {
    this.actividades = this.activityService.getActividad();
  }

  activitiesByDate(activities: Actividad[]){
    alert("Adios");
    this.activitiesDate = activities;
  }

  // Método para cambiar al mes anterior


}

