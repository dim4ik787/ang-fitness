import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleControlsComponent } from './schedule-controls.component';

describe('ScheduleControlsComponent', () => {
  let component: ScheduleControlsComponent;
  let fixture: ComponentFixture<ScheduleControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleControlsComponent],
    });
    fixture = TestBed.createComponent(ScheduleControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
