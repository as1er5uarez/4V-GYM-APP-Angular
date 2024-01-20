import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actividad } from '../models/actividad.model';
import { ActivityService } from '../activity.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Monitor } from '../models/monitor.model';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  actividades: Actividad[] = [];
  activitiesDate: Actividad[] = [];
  monitors: Monitor[] = [];
  actividadForm: FormGroup;
  constructor(private fb: FormBuilder, private activityService: ActivityService) {
    this.actividades = this.activityService.getActividad();
    this.monitors = this.activityService.getMonitor();
    this.actividadForm = this.fb.group({
      type: ['', Validators.required],
      monitor1 : ['', Validators.required],
      monitor2 : ['', Validators.required],
    });
    this.actividadForm.get('monitor2')?.setValidators([Validators.required, this.monitorDistinct.bind(this)]);
    this.newActivityInitHOur = "";
    this.newActivityFinalHour  = "";
    this.id = "";
  }

  @Input() daysOfMonth: number[][] = [];
  currentDate = new Date();
  selectedMonitor1: Monitor | undefined;
  selectedMonitor2: Monitor | undefined;
  newActivityInitHOur: string;
  newActivityFinalHour: string ;
  id: string;
  refreshFlag: boolean = false;

  refreshView(): void {
    this.refreshFlag = true;
  }

  takeHour(id: string): void{
    alert(2)
    alert(id)
    switch (id) {
      case '0':
        this.newActivityInitHOur = "10:00";
        this.newActivityFinalHour = "11:30";
        break;
      case '1':
        this.newActivityInitHOur = "13:30";
        this.newActivityFinalHour = "15:00";
        break;
      case '2':
        this.newActivityInitHOur = "17:30";
        this.newActivityFinalHour = "19:00";
        break;

    }
  }
  


  monitorDistinct(control: AbstractControl){
    let mon : string = "";
    const monitor1Control = this.actividadForm.get('monitor1')?.value ?? mon;
    if (monitor1Control) {
      const monitor1 = monitor1Control.value;
      const monitor2 = control.value;
  
      return monitor1 !== monitor2 ? null : { mismoMonitor: true };
    }
  
    // Handle el caso cuando tuFormulario o nombre1Control son null
    return null;
  }

  ngOnInit(): void {}

  // Método para cambiar al mes anterior
  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  prevDay(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.daySelected(this.currentDate.getDate(), this.currentDate.toLocaleString('default', { month: 'long' }), this.currentDate.getFullYear().toString());
    this.showActivities(this.currentDate.getDate(), this.currentDate.toLocaleString('default', { month: 'long' }), this.currentDate.getFullYear().toString());
  }

  nextDay(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.daySelected(this.currentDate.getDate(), this.currentDate.toLocaleString('default', { month: 'long' }), this.currentDate.getFullYear().toString());
    this.showActivities(this.currentDate.getDate(), this.currentDate.toLocaleString('default', { month: 'long' }), this.currentDate.getFullYear().toString());
  }

  // Método para cambiar al mes siguiente
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  // Metodo que al pulsar un dia cambia el h3 al dia pulsado
  daySelected(day: number, month: string, year: string): void {
    const h3 = document.querySelector('h3');
    
    if (h3 != null){
      h3.innerHTML = day.toString() + ' ' + month + ' ' + year.toString();
      
      //this.currentDate.setDate(new Date(parseInt(year, 10), this.getMonthNumber(month), day));
      this.currentDate = new Date(parseInt(year, 10), this.getMonthNumber(month), day);
    }
  }

  private updateCalendar(): void {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    // Lógica para obtener el número de días en el mes actual
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Lógica para obtener el día de la semana en el que comienza el mes
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    this.daysOfMonth = [];

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week: number[] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          // Días del mes anterior y posterior
          week.push(0); // O cualquier otro valor que prefieras para representar días no válidos
        } else {
          // Días del mes actual
          week.push(dayCounter);
          dayCounter++;
        }
      }
      this.daysOfMonth.push(week);
    }
  }

  showActivities(day: number, month: string, year: string): void {
    this.activitiesDate = [];
    const yearInt = parseInt(year, 10);
    const monthInt = this.getMonthNumber(month);
    let date = new Date(yearInt, monthInt, day);
    date.setHours(1,0,0,0);    
    for (let actividad of this.actividades) {
      actividad.date.setHours(1,0,0,0);
      if (actividad.date.getTime() === date.getTime()) {
        this.activitiesDate.push(actividad);
      }
    }

  }

  getMonthNumber(month: string): number {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.findIndex((m) => m.toLowerCase() === month.toLowerCase());
  
    // Asegurarse de que el índice encontrado es válido, de lo contrario, retornar un valor por defecto
    return monthIndex !== -1 ? monthIndex : 0; // Puedes elegir otro valor por defecto si prefieres
  }

  onSubmit() {
    const newActivityDate = this.currentDate;

    if (this.actividadForm.valid) {
      const type = this.actividadForm.value.type || '';
      const monitor1 = this.actividadForm.value.monitor1 || '';
      const monitor2 = this.actividadForm.value.monitor2 || '';
      this.activityService.addActividad(type, monitor1, monitor2, this.newActivityInitHOur, this.newActivityFinalHour, newActivityDate);

      this.refreshView();
      // Limpia el formulario después de agregar la actividad si es necesario
      this.actividadForm.reset();
    } else {
      console.log('Formulario no válido. Por favor, completa todos los campos.');
    }
  }
  
    
}

