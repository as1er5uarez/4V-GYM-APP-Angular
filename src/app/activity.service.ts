import { Injectable } from '@angular/core';
import { Actividad } from './models/actividad.model';
import { Monitor } from './models/monitor.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  
  private monitors: Monitor[] = [
    {
      id: 1,
      telephone: '1234659',
      name: 'Juan',
      email: 'juanperez@gmail.com'
    },
    {
      id: 2,
      telephone: '1234659',
      name: 'Pablo',
      email: 'pablilloeldrogillo@gmail.com'
    }
  ];
  private fecha1 = new Date('2023-12-28');
  private actividades: Actividad[] = [
    {id: 1, type: 'Pilates', monitor1: this.monitors[0], monitor2: null, date: new Date('2023-12-28'), init_hour: '17:30', finish_hour: '19:00'},
    {id: 2, type: 'Yoga', monitor1: this.monitors[0], monitor2: this.monitors[1], date: new Date('2023-12-31'), init_hour: '10:00', finish_hour: '11:30'},
  ];

  getActividad(): Actividad[] {
    return this.actividades;
  }
  
  getMonitor(): Monitor[] {
    return this.monitors;
  }

  getActividadById(id: number): Actividad | undefined{ 
    return this.actividades.find(actividad => actividad.id === id);
  }

  addActividad(type: string, idMonitor: number, idMonitor2: number, init_hour: string, final_hour: string, date: Date ): void {

    const actividad: Actividad = {
      id: this.actividades.length + 1,
      type: type,
      monitor1: this.monitors.find(mon => mon.id === idMonitor) !== undefined ? this.monitors.find(mon => mon.id === idMonitor)! : this.monitors[0],
      monitor2: this.monitors.find(mon => mon.id === idMonitor2) || null,
      date: date,
      init_hour: init_hour.toString(),
      finish_hour: final_hour.toString()
    }
    this.actividades.push(actividad);
  }
  constructor() { }

  
}
