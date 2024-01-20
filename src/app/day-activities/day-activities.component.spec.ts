import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayActivitiesComponent } from './day-activities.component';

describe('DayActivitiesComponent', () => {
  let component: DayActivitiesComponent;
  let fixture: ComponentFixture<DayActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
