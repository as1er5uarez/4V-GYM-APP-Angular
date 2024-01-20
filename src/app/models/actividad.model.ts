import { Monitor } from "./monitor.model";

export interface Actividad{
    id: number;
    type: string;
    monitor1: Monitor;
    monitor2: Monitor | null;
    date: Date;
    init_hour: string;
    finish_hour: string;
}